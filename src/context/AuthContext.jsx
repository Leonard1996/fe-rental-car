import { createContext, useState, useContext } from 'react';

const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = () => setUser({});
  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
