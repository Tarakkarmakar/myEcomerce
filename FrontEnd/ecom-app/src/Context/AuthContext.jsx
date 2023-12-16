
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState([
        { user: null, token: '' }, // Initial user object and token
        (newAuth) => {

          setAuth([
            { user: newAuth.user, token: newAuth.token },
            auth[1] 
          ]);
        }
      ]);
      

  useEffect(() => {
    // Update the axios header whenever the auth token changes
    axios.defaults.headers.common['Authorization'] = auth[0].token ? `Bearer ${auth[0].token}` : null;
  }, [auth[0].token]); // Add auth[0].token as a dependency

  useEffect(() => {
    const data = localStorage.getItem('auth');
    if (data) {
      const parseData = JSON.parse(data);
      setAuth([
        { user: parseData.user, token: parseData.token },
        auth[1] // Preserve the setAuth function
      ]);
    }
  }, []);

  console.log(auth)

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider, AuthContext };
