import React, { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StatusBar, Style } from '@capacitor/status-bar';

import DocumentPage from './components/layouts/documentPage';
import NewDocumentPage from './components/layouts/documentNew';
import { Preferences } from '@capacitor/preferences';
import './App.css';
import UsersData from './exampledata/Users.json';
import DocumentData from './exampledata/Documents.json'
import Home from './components/layouts/home';
import SearchPage from './components/layouts/searchPage';
import NavigationBar from './components/partials/navigation-bar';
import LoginPage from './components/layouts/loginPage';
import RegistrationPage from './components/layouts/registrationPage';
import RelevantFiles from './components/partials/relevantFiles';
import SearchResults from './components/layouts/searchResults';
import ProfilePage from './components/layouts/profilePage';
import UserPage from './components/layouts/userPage';

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
          <Route path="/profile/:id" element={<UserPage docData={DocumentData} />} />
          <Route path="/profile" element={<ProfilePage docData={DocumentData} />} />
          <Route path="/preview/:id" element={<DocumentPage docData={DocumentData} />} />
          <Route path="/new" element={<NewDocumentPage userData={UsersData} docData={DocumentData} />} />
          <Route path="/home" element={<Home docData={DocumentData} userData={UsersData} />} />
          <Route path="/preview-carrousel" element={<Home docData={DocumentData} userData={UsersData} />} />
          <Route path="/search" element={<SearchPage docData={DocumentData} userData={UsersData} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/search-results" element={<SearchResults docData={DocumentData} userData={UsersData} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;