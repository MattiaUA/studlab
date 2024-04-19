import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DocumentPage from './pages/document-page';
import NavigationBar from "./components/navigation-bar";

import './App.css';
import UsersData from './exampledata/Users.json';
import DocumentData from './exampledata/Documents.json'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<DocumentPage data={DocumentData["documentos"][1]} />} />
        </Routes>
      </Router>
      <NavigationBar user={UsersData[0]}></NavigationBar>
    </div>
  );
}

export default App;