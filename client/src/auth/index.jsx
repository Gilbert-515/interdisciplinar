import { createContext, useState, useEffect } from 'react';

export const Auth = createContext();

export function AuthContext ({ children }) {

  const [auth, setAuth] = useState(false);

  const checkSession = async () => {
    const session = Number(sessionStorage.getItem('authToken'));
    session && setAuth(true);
  }

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <Auth.Provider value={[ auth, setAuth ]}>
      { children }
    </Auth.Provider>
  )
}