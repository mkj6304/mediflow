// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar.jsx'; 
import Home from './pages/Home';
import Hospital from './pages/Hospital';
import Manufacturer from './pages/Manufacturer';
import User from './pages/User';
import Pharmacy from './pages/Pharmacy';
import Supplier from './pages/Supplier';
import Lab from './pages/Lab';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/manufacturer" element={<Manufacturer />} />
        <Route path="/user" element={<User />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
