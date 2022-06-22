import { createContext, useState } from 'react';

export const Auth = createContext();

export function AuthContext ({ children }) {

  const [auth, setAuth] = useState(false);

  return (
    <Auth.Provider value={[ auth, setAuth ]}>
      { children }
    </Auth.Provider>
  )
}