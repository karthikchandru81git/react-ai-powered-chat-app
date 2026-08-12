import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  const updateUsername = (value) => {
    setUsername(value);
    sessionStorage.setItem('user_info', JSON.stringify({ username: value }))
  }
  return (
    <AppContext.Provider value={{ username, updateUsername }}>{children}</AppContext.Provider>
  )
}
