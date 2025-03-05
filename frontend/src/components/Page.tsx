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
  item: string;
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
      <AddTodo />
      <Stack gap={5}>
      {
          todos.map((todo) => (
              <TodoHelper item={todo.item} id={todo.id} fetchTodos={fetchTodos}/>
          ))
      }
      </Stack>
      </Container>
      </TodosContext.Provider>
  )

}



function AddTodo() {
    const [item, setItem] = React.useState("")
    const {todos, fetchTodos} = React.useContext(TodosContext)

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItem(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newTodo = {
            "id": todos.length + 1,
            "item": item
        }

        fetch("http://localhost:8000/todo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo)
        }).then(fetchTodos)
    }

    return (
        <form onSubmit={handleSubmit}>
        Subscribe
        <Input
        pr="4.5rem"
        type="text"
        placeholder="Enter a username"
        aria-label="Enter a username"
        onChange={handleInput}
        />

        <Input
        pr="4.5rem"
        type="text"
        placeholder="Enter a password"
        aria-label="Enter a password"
        onChange={handleInput}
        />

        Connect
        <Input
        pr="4.5rem"
        type="text"
        placeholder="Enter a username"
        aria-label="Enter a username"
        onChange={handleInput}
        />

        <Input
        pr="4.5rem"
        type="text"
        placeholder="Enter a password"
        aria-label="Enter a password"
        onChange={handleInput}
        />

        </form>
    )
}

const UpdateTodo = ({ item, id, fetchTodos }: UpdateTodoProps) => {
  const [todo, setTodo] = useState(item);
  const updateTodo = async () => {
    await fetch(`http://localhost:8000/todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: todo }),
    });
    await fetchTodos();
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button h="1.5rem" size="sm">
          Update Todo
        </Button>
      </DialogTrigger>
      <DialogContent
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="white"
        p={6}
        rounded="md"
        shadow="xl"
        maxW="md"
        w="90%"
        zIndex={1000}
      >
        <DialogHeader>
          <DialogTitle>Update Todo</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Input
            pr="4.5rem"
            type="text"
            placeholder="Add a todo item"
            aria-label="Add a todo item"
            value={todo}
            onChange={event => setTodo(event.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" size="sm">Cancel</Button>
          </DialogActionTrigger>
          <Button size="sm" onClick={updateTodo}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}


function TodoHelper({item, id, fetchTodos}: TodoHelperProps) {
  return (
    <Box p={1} shadow="sm">
      <Flex justify="space-between">
        <Text mt={4} as="div">
          {item}
          <Flex align="end">
            <UpdateTodo item={item} id={id} fetchTodos={fetchTodos}/>
          </Flex>
        </Text>
      </Flex>
    </Box>
  )
}


