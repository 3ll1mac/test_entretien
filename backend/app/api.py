from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
base = sqlite3.connect('example.db')
c = base.cursor()
#c.execute('''CREATE TABLE users
#            (username text, password text)''')

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
    return {"message": "Please go to /users to see the list of users"}

todos = [
    {
        "id": "2",
        "user": "camille",
        "pass": "geoffroy"
    }
]


@app.get("/todo", tags=["todos"])
async def get_todos() -> dict:
    return { "data": todos }


@app.post("/subscribe", tags=["todos"])
async def add_user(todo: dict) -> dict:
    #todos.append(todo)
    c.execute("INSERT INTO users VALUES (?,?)", (todo["user"], todo["pass"]));
    base.commit();
    print("hello reussi\n")
    return {
        "data": { "user created." }
        }



@app.post("/connect", tags=["todos"])
async def add_todo(todo: dict) -> dict:
    print(todo)
    for elt in todos:
        c.execute("SELECT * FROM users WHERE username = ?", (todo["user"], ))
        result = c.fetchone();
        if len(result) > 0:
                return {
                    "data": { "You are connected" }
                    }
        else:
            print("not connected");
            return {
                "data": { "The password or username is incorrect." }
                }
        
