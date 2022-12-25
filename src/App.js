import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


import './index.css'
import Employee from './Employee';
import AddEmployee from './components/AddEmployee';
import Employees from './pages/Employees';
import EditEmployee from './components/EditEmployee';
import Header from './components/Header'

function App() {
  return (
    <Header>
      <Employees />
    </Header>
  );
}

export default App;
