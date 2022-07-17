import React from 'react';

// Router
import { Routes, Route } from 'react-router-dom';

// Components
import UserHeader from './UserHeader';
import Feed from '../feed/Feed';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats';

// Helper
import NotFound from '../helper/NotFound';

// Context Api
import { UserContext } from '../../UserContext';

// Styles
import stylesGlobal from '../../App.module.scss';

const User = () => {
  const { data } = React.useContext(UserContext);

  return (
    <section className={stylesGlobal.container}>
      {data && (
        <>
          <UserHeader />
          <Routes>
            <Route path="/feed" element={<Feed user={data.username} />} />
            <Route path="/post" element={<UserPhotoPost />} />
            <Route
              path="statistics"
              element={<UserStats user={data.username} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </section>
  );
};

export default User;
