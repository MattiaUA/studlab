import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DocumentPage from './pages/document-page';

import './App.css';
import UsersData from './exampledata/Users.json';
import DocumentData from './exampledata/Documents.json'
import Home from './components/layouts/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DocumentPage data={DocumentData["documentos"][1]}/>} />
        <Route path="/preview" element={<Home docData={DocumentData} userData = {UsersData} /> } />
        <Route path="/preview-carrousel" element={<Home docData={DocumentData} userData = {UsersData} /> } />
        <Route path="/search" element={<Home docData={DocumentData} userData = {UsersData} /> } />
      </Routes>
    </Router>
  );
}

export default App;