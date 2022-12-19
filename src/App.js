import { useState } from 'react';
import './App.css';
import Employee from './Employee';
import AddEmployee from './components/AddEmployee';
import { v4 as uuidv4 } from 'uuid';
import EditEmployee from './components/EditEmployee';
import Header from './components/Header'

function App() {
  const [role, setRole] = useState('dev');
  const [employees, setEmployees] = useState(
    [
      {
        id: 1,
        name: 'Filip',
        role: 'Coffe-Assistant',
        img: 'https://career.comarch.com/files-com/file_45/good_programmer_comarch.jpg'
      },
      {
        id: 2,
        name: 'Błażej',
        role: 'Front-End',
        img: 'https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        id: 3,
        name: 'Piotr',
        role: 'Front-End',
        img: 'https://images.pexels.com/photos/2036656/pexels-photo-2036656.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
        id: 4,
        name: 'Łukasz',
        role: 'Back-End',
        img: 'https://images.pexels.com/photos/3277802/pexels-photo-3277802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        id: 5,
        name: 'Tobiasz',
        role: 'Back-End',
        img: 'https://images.pexels.com/photos/1181312/pexels-photo-1181312.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
        id: 6,
        name: 'Kacper',
        role: 'Front-End',
        img: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
    ]
  );

  function updateEmployee(id, newName, newRole) {
    const updatedEmployees = employees.map((data) => {
      if (id === data.id) {
        return { ...data, name: newName, role: newRole }
      }
      return data;
    });
    setEmployees(updatedEmployees);
  }

  function newEmployee(name, role, img) {
    let newEmployee = {
      id: uuidv4,
      name: name,
      role: role,
      img: img,
    }
    setEmployees([...employees, newEmployee])
  }

  return (
    <div className='App '>
      <Header />
      <div className='flex flex-wrap justify-center'>
        {employees.map(data => {
          const editEmployee = (
            <EditEmployee
              id={data.id}
              name={data.name}
              role={data.role}
              updateEmployee={updateEmployee} />
          );
          return <Employee
            key={data.id}
            id={data.id}
            name={data.name}
            role={data.role}
            img={data.img}
            editEmployee={editEmployee} />
        })}
      </div>
      <AddEmployee newEmployee={newEmployee} />
    </div>
  );
}

export default App;
