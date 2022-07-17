import React from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// Api
import { USER_GET, TOKEN_VALIDATE_POST } from './api';

export const UserContext = React.createContext();

export const UserStore = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(() => {
    setData(null);
    setError(null);
    setLogin(null);
    window.localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  const callUser = async function (token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    response.ok ? setLogin(true) : setLogin(false);
  };

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');

      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido');
          await callUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{
        userLogout,
        callUser,
        setData,
        data,
        login,
        setLogin,
        setError,
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
