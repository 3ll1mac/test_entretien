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


// Main page, will call subcribe and connect parts

export default function LoginPage() {
  return (
      <Container maxW="container.xl" pt="100px">
      <Subscribe />
      <Connect />
      </Container>
  )
}

function Subscribe() {
    const [username, setUser] = React.useState("")
    const [password, setPass] = React.useState("")

    // updating values in username / password
    // The following way allows to easily add checks on each change made by user
    // For instance if we exclude some characters like '";
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value)
    }

    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value)
    }

    // sending data to backend
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const element = document.getElementById("info");
        if (username.length === 0 || password.length === 0)
        {
            element.innerHTML = "The username and password field must not be empty !"
            return;
        }
        const newUser = {
            "user": username,
            "pass": password
        }

        document.getElementById('username_input').value = ''
        document.getElementById('password_input').value = ''
        element.innerHTML = "";
        setUser("");
        setPass("");

            fetch("http://localhost:8000/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            }).then((response) => {
                // for the level of development of the api, the only 
                // error received will be because a user already exists 
                // with this name
                if (response.status === 200)
                    element.innerHTML = "You are successfully subscribed.";
                else
                    element.innerHTML = "A user by that name already exists";
            })
        }

    return (
        <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
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

    // updating values in username / password
    // The following way allows to easily add checks on each change made by user
    // For instance if we exclude some characters like '";
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value)
    }

    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value)
    }


    // sending data to backend
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const element = document.getElementById("info_connect");
        if (username.length === 0 || password.length === 0)
        {
            element.innerHTML = "The username and password field must not be empty !"
            return;
        }

        const newTodo = {
            "user": username,
            "pass": password
        }

        element.innerHTML = "";
        document.getElementById('connect_username_input').value = ''
        document.getElementById('connect_password_input').value = ''
        setUser("");
        setPass("");
            fetch("http://localhost:8000/connect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTodo)
            }).then((res) => {
                // for the level of development of the API, the only
                // error received will be because the username or password 
                // is invalid
                if (res.status === 200)
                    element.innerHTML = "You are successfully connected.";
                else
                    element.innerHTML = "The username or password is invalid";
            })
    }

    return (
        <form onSubmit={handleSubmit}>
        <h1>Log in</h1>
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

