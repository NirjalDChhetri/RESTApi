import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import AddBook from './pages/AddBook';
import "./assets/sass/main.scss";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Homepage/>}/>
        <Route path="/dashboard">
          <Route index element={<Dashboard/>}/>
          <Route path='addBook' element={<AddBook/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App