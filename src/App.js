import { BrowserRouter, Routes, Route } from 'react-router-dom'


import './index.css'
import Employees from './pages/Employees';
import Header from './components/Header'
import Customers from './pages/Customers';
import Dictionary from './pages/Dictionary';
import Definition from './pages/Definition';
import NotFound from './pages/404';

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path='/'></Route>
          <Route path='/employees' element={<Employees />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/dictionary' element={<Dictionary />} />
          <Route path='/dictionary/:search' element={<Definition />} />
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Header >
    </BrowserRouter>
  );
}

export default App;
