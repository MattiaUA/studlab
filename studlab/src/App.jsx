import React, { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Preferences } from '@capacitor/preferences';

import DocumentPage from './components/layouts/documentPage';
import NewDocumentPage from './components/layouts/documentNew';
import './App.css';
import UsersData from './exampledata/Users.json';
import DocumentData from './exampledata/Documents.json';
import Home from './components/layouts/home';
import SearchPage from './components/layouts/searchPage';
import LoginPage from './components/layouts/loginPage';
import NotificationsPage from './components/layouts/notificationsPage';
import RegistrationPage from './components/layouts/registrationPage';
import SearchResults from './components/layouts/searchResults';
import ProfilePage from './components/layouts/profilePage';
import UserPage from './components/layouts/userPage';

function App() {
  const [docData, setDocData] = useState(DocumentData);
  const [userData, setUserData] = useState(UsersData);
  const usersData = UsersData;

  useEffect(() => {
    const loadDocumentData = async () => {
      const { value } = await Preferences.get({ key: 'DocumentData' });
      if (value) {
        setDocData(JSON.parse(value));
      }
    };

    const loadUserData = async () => {
      const { value } = await Preferences.get({ key: 'UserData' });
      if (value) {
        setUserData(JSON.parse(value));
      }
    };

    loadDocumentData();
    loadUserData();

    if (Capacitor.isNativePlatform()) {
      setTimeout(() => {
        StatusBar.setBackgroundColor({ color: '#4966FF' });
        StatusBar.setStyle({ style: Style.Dark });

        CapacitorApp.addListener('backButton', ({ canGoBack }) => {
          if (!canGoBack) CapacitorApp.exitApp();
          else window.history.back();
        });
      }, 500);
    }
  }, []);

  return (
    <div className='main-content'>
      <Router>
        <Routes>
          <Route path="/profile/:id" element={<UserPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/preview/:id" element={<DocumentPage docData={docData}/>} />
          <Route path="/new" element={<NewDocumentPage userData={usersData} docData={docData} />} />
          <Route path="/home" element={<Home docData={docData} userData={usersData} />} />
          <Route path="/preview-carrousel" element={<Home docData={docData} userData={usersData} />} />
          <Route path="/search" element={<SearchPage docData={docData} userData={usersData} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/search-results" element={<SearchResults docData={docData} userData={usersData} />} />
          <Route path="/notifications" element={<NotificationsPage data={docData.documentos[1]} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
