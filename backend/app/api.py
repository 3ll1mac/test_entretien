from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
import sqlite3

base = sqlite3.connect('base.db')
c = base.cursor()
c.execute('''CREATE TABLE users
            (username text, password text)''')

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Go to /users to see the list of users"}


# Displays list of users
@app.get("/fetch_users", tags=["display"])
async def get_todos() -> dict:
    c.execute("SELECT username FROM users");
    res = c.fetchall();
    print(res);
    return { "data": res }


# Try to add a user to the database
# returns an error if a user with the same name already exists
@app.post("/subscribe", tags=["handle"])
async def add_user(todo: dict) -> dict:
    c.execute("SELECT * FROM users WHERE username = ?", (todo["user"], ))
    result = c.fetchall();
    if len(result) > 0:
        raise HTTPException(status_code=404, detail="A user with this name already exists.")
    c.execute("INSERT INTO users VALUES (?,?)", (todo["user"], pwd_context.hash(todo["pass"])));
    base.commit();
    return {"data": { "user created." }}


# Try to connect a user
# Fail if the username and password are incorrect or missing
@app.post("/connect", tags=["handle"])
async def add_todo(todo: dict) -> dict:
    c.execute("SELECT * FROM users WHERE username = ?", (todo["user"], ))
    result = c.fetchone();
    if result == None  or not pwd_context.verify(todo["pass"],result[1]):
        raise HTTPException(status_code=404, detail="The username or password is incorrect.")
    else:
        return {"data": { "You are connected."}}
