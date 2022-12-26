import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import './index.css'
import Employees from './pages/Employees';
import Header from './components/Header'
import Customers from './pages/Customers';
import Dictionary from './components/Dictionary';

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path='/'></Route>
          <Route path='/employees' element={<Employees />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/dictionary' element={<Dictionary />} />
        </Routes>
      </Header >
    </BrowserRouter>
  );
}

export default App;
