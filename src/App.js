import React from 'react';

// Context Api
import { UserStore } from './UserContext';

// Routes;
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Styles
import styles from './App.module.scss';
import './App.module.scss';

// Helper
import ProtectedAccess from './Components/helper/ProtectedAccess';
import NotFound from './Components/helper/NotFound';

// Components
import UserFeed from './Components/user/UserFeed';
import Photo from './Components/photo/Photo';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Login from './Components/login/Login';
import User from './Components/user/User';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <UserStore>
          <Header />
          <main className={styles.AppBody}>
            <Routes>
              <Route path="/*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route
                path="/mypage/*"
                element={
                  <ProtectedAccess>
                    <User />
                  </ProtectedAccess>
                }
              />
              <Route path="/user/:user" element={<UserFeed />} />
              <Route path="/photo/:id" element={<Photo />} />
              <Route path="/login/*" element={<Login />} />
            </Routes>
          </main>

          <Footer />
        </UserStore>
      </BrowserRouter>
    </div>
  );
}

export default App;
