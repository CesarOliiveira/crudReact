import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../pages/home'
import Edit from '../pages/Edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit/>} />
        <Route path="*" element={<h1>Página não encontrada.</h1>} />
      </Routes>
    </BrowserRouter>
  );
}




export default App;
