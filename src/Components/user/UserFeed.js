import React from 'react';

// Components
import Feed from '../feed/Feed';

// Router
import { useParams } from 'react-router-dom';

const UserFeed = () => {
  const { user } = useParams();
  return <Feed user={user} />;
};

export default UserFeed;
