import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from "@chakra-ui/react"
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Todos from "./components/Page";  
import DisplayUsers from "./components/Display";  

const App: React.FC = () => {

  return (
    <ChakraProvider value={defaultSystem}>
    <Header />
    <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<Todos />} />
                <Route path="/users" element={<DisplayUsers />} />
            </Routes>
        </div>
    </Router>
    </ChakraProvider>
  )
}

export default App;

