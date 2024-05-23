import React, { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StatusBar, Style } from '@capacitor/status-bar';

import DocumentPage from './components/layouts/documentPage';
import NewDocumentPage from './components/layouts/documentNew';

import './App.css';
import UsersData from './exampledata/Users.json';
import DocumentData from './exampledata/Documents.json'
import Home from './components/layouts/home';
import SearchPage from './components/layouts/searchPage';
import NavigationBar from './components/partials/navigation-bar';
import LoginPage from './components/layouts/loginPage';
import RegistrationPage from './components/layouts/registrationPage';

function App() {
  if (Capacitor.isNativePlatform()) {
    setTimeout(() => {
      // Color de la barra de estado nativa
      StatusBar.setBackgroundColor({ color: '#4966FF' });
      StatusBar.setStyle({ style: Style.Dark });

      // Boton de atras de android
      CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) CapacitorApp.exitApp();
        else window.history.back();
      });
    }, 500);
  }

  return (
    <div className='main-content'>
      <Router>
        <Routes>
          <Route path="/" element={<DocumentPage data={DocumentData["documentos"][0]}/>} />
          <Route path="/new" element={<NewDocumentPage userData={UsersData}/>} />
          <Route path="/preview" element={<Home docData={DocumentData} userData={UsersData} />} />
          <Route path="/preview-carrousel" element={<Home docData={DocumentData} userData={UsersData} />} />
          <Route path="/search" element={<SearchPage docData={DocumentData} userData={UsersData} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;