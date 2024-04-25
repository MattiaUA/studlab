import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StatusBar, Style } from '@capacitor/status-bar';

import DocumentPage from './pages/document-page';
import NavigationBar from "./components/partials/navigation-bar";

import './App.css';
import UsersData from './exampledata/Users.json';
import DocumentData from './exampledata/Documents.json'
import Home from './components/layouts/home';

function App() {
  setTimeout(() => {
    StatusBar.setBackgroundColor({ color: '#4966FF' });
    StatusBar.setStyle({ style: Style.Dark });
  }, 500);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<DocumentPage data={DocumentData["documentos"][1]} />} />
          <Route path="/home" element={<Home docData={DocumentData} userData = {UsersData} /> } />
        </Routes>
        <NavigationBar user={UsersData[0]}></NavigationBar>
      </Router>
    </div>
  );
}

export default App;