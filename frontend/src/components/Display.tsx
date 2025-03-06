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

/// This file handle the frontend part of the /users endpoints

interface Users {
  id: string;
  user: string;
  pass: string;
}

const UserContext = createContext({
  users: [], fetchUsers: () => {}
})


export default function DisplayUsers() {
  const [users, setUsers] = useState([])

  // fetching the data
  const fetchUsers = async () => {
    const response = await fetch("http://localhost:8000/fetch_users")
    const users = await response.json()
    setUsers(users.data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  // displaying the data
  return (
      <UserContext.Provider value={{users, fetchUsers}}>
      <Container maxW="container.xl" pt="100px">
      <div><pre>{JSON.stringify(users, null, 2) }</pre></div>
      </Container>
      </UserContext.Provider>
  )
}
