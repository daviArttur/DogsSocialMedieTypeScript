import React from 'react';



// Router
// Helper
// Components
import PhotoCommentsForm from './PhotoCommentsForm';
// APi
// Context Api
import { UserContext } from '../../UserContext';
// Hooks

const PhotoCommentAuthorization = ({ data, setCommentReload }) => {
  const { login } = React.useContext(UserContext);
  const token = window.localStorage.getItem('token');
  return login && (
  <PhotoCommentsForm 
    photoAndComment={data} 
    token={token}
    setCommentReload={setCommentReload}
  />);
};

export default PhotoCommentAuthorization;
