import React, { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StatusBar, Style } from '@capacitor/status-bar';

import DocumentPage from './components/layouts/documentPage';

import './App.css';
import UsersData from './exampledata/Users.json';
import DocumentData from './exampledata/Documents.json'
import Home from './components/layouts/home';
import SearchPage from './components/layouts/searchPage';
import NavigationBar from './components/partials/navigation-bar';
import RelevantFiles from './components/partials/relevantFiles';

function App() {
  if (Capacitor.isNativePlatform()) {
    setTimeout(() => {
      StatusBar.setBackgroundColor({ color: '#4966FF' });
      StatusBar.setStyle({ style: Style.Dark });
    }, 500);
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<DocumentPage data={DocumentData["documentos"][1]}/>} />
          <Route path="/preview" element={<Home docData={DocumentData} userData={UsersData} />} />
          <Route path="/preview-carrousel" element={<Home docData={DocumentData} userData={UsersData} />} />
          <Route path="/search" element={<SearchPage docData={DocumentData} userData={UsersData} />} />
          <Route path="/relevant-files" element={<RelevantFiles docData={DocumentData} userData={UsersData}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;