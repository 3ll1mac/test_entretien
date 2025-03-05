from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


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
    return {"message": "Welcome."}

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
    todos.append(todo)
    print("hello reussi\n")
    return {
        "data": { "user created." }
        }



@app.post("/connect", tags=["todos"])
async def add_todo(todo: dict) -> dict:
    print(todo)
    for elt in todos:
        if elt["user"]  == todo["user"]:
            if elt["pass"] == todo["pass"]:
                print("connected");
                return {
                    "data": { "You are connected" }
                    }
            else:
                print("not connected");
                return {
                    "data": { "The password or username is incorrect." }
                    }
