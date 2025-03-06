import React, { useEffect, useState, createContext, useContext } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Stack,
  Text,
  DialogActionTrigger,
} from "@chakra-ui/react";

interface Todo {
  id: string;
  user: string;
  pass: string;
}

interface TodoHelperProps {
  item: string;
  id: string;
  fetchTodos: () => void;
}

interface TodoHelperProps {
  item: string;
  id: string;
  fetchTodos: () => void;
}

const TodosContext = createContext({
  todos: [], fetchTodos: () => {}
})


export default function Todos() {
  const [todos, setTodos] = useState([])
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todo")
    const todos = await response.json()
    setTodos(todos.data)
  }
  useEffect(() => {
    fetchTodos()
  }, [])

  return (
      <TodosContext.Provider value={{todos, fetchTodos}}>
      <Container maxW="container.xl" pt="100px">
      <Subscribe />
      <Connect />
      </Container>
      </TodosContext.Provider>
  )

}

function Subscribe() {
    const [username, setUser] = React.useState("")
    const [password, setPass] = React.useState("")
    const {todos, fetchTodos} = React.useContext(TodosContext)

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value)
    }

    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newUser = {
            "id": todos.length + 1,
            "user": username,
            "pass": password
        }

        console.log("hello1\n");
        const element = document.getElementById("info");
        document.getElementById('username_input').value = ''
        document.getElementById('password_input').value = ''
        element.innerHTML = "";

            res = fetch("http://localhost:8000/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            }).then((response) => {
                if (response.status === 200)
                    element.innerHTML = "You are successfully subscribed.";
                else
                    element.innerHTML = "A user by that name already exists";
            })
        }

    return (
        <form onSubmit={handleSubmit}>
        <h1>Subscribe</h1>
        <Input
        pr="4.5rem"
        type="text"
        placeholder="Enter a username"
        aria-label="Enter a username"
        onChange={handleUsername}
        id="username_input"
        />

        <Input
        pr="4.5rem"
        type="text"
        placeholder="Enter password"
        aria-label="Enter password"
        onChange={handlePassword}
        id="password_input"
        />
        <Button h="1.5rem" size="sm" type="submit">
          Subscribe
        </Button>
        <p id="info"></p>
        </form>
    )
}

function Connect() {
    const [username, setUser] = React.useState("")
    const [password, setPass] = React.useState("")
    const {todos, fetchTodos} = React.useContext(TodosContext)

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value)
    }

    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newTodo = {
            "id": todos.length + 1,
            "user": username,
            "pass": password
        }

        const element = document.getElementById("info_connect");
        element.innerHTML = "";
        document.getElementById('connect_username_input').value = ''
        document.getElementById('connect_password_input').value = ''

            res = fetch("http://localhost:8000/connect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTodo)
            }).then((response) => {
                if (response.status === 200)
                    element.innerHTML = "You are successfully connected.";
                else
                    element.innerHTML = "The username or password is invalid";
            })
    
    }

    return (
        <form onSubmit={handleSubmit}>
        <h1>Connect</h1>
        <Input
        pr="4.5rem"
        type="text"
        placeholder="Enter a username"
        aria-label="Enter a username"
        onChange={handleUsername}
        id="connect_username_input"
        />

        <Input
        pr="4.5rem"
        type="text"
        placeholder="Enter a password"
        aria-label="Enter a password"
        onChange={handlePassword}
        id="connect_password_input"
        />
        <Button h="1.5rem" size="sm" type="submit">
        Connect
        </Button>
        <p id="info_connect"></p>
        </form>
    )
}

