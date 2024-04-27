import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DocumentPage from './components/layouts/documentPage';

import './App.css';
import UsersData from './exampledata/Users.json';
import DocumentData from './exampledata/Documents.json'
import Home from './components/layouts/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/document" element={<DocumentPage data={DocumentData["documentos"][1]}/>} />
        <Route path="/home" element={<Home docData={DocumentData} userData = {UsersData} /> } />
        <Route path="/preview-carrousel" element={<Home docData={DocumentData} userData = {UsersData} /> } />
        <Route path="/search" element={<Home docData={DocumentData} userData = {UsersData} /> } />
      </Routes>
    </Router>
  );
}

export default App;