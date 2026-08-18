import React, { createContext, useContext, useState } from 'react';

type AppContextType = {
  username: string,
  updateUsername: (username: string) => void
}
export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string>('');

  const updateUsername = (value: string) => {
    setUsername(value);
    sessionStorage.setItem('user_info', JSON.stringify({ username: value }))
  }
  return (
    <AppContext.Provider value={{ username, updateUsername }}>{children}</AppContext.Provider>
  )
}
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider container');
  }
  return context;
}