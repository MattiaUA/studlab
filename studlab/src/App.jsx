import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DocumentPage from './pages/document-page';

import './App.css';
import UsersData from './exampledata/Users.json';
import DocumentData from './exampledata/Documents.json'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DocumentPage data={DocumentData["documentos"][1]}/>} />
      </Routes>
    </Router>
  );
}

export default App;