import { useState, useEffect } from 'react';

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => localStorage.getItem('user'));

  const saveLogin = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', username);
    setToken(token);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return { token, user, isAdmin: !!token, saveLogin, logout };
}
