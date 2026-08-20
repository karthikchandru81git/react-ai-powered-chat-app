import React, { createContext, useContext, useState } from 'react';

type AppContextType = {
  username: string,
  updateUsername: (username: string) => void,
  theme: boolean,
  updateSetTheme: () => void
}
export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string>(() => {
    const storedUserName = sessionStorage.getItem('userInfo');
    if(storedUserName){
      return JSON.parse(storedUserName).username;
    }
  });
  const [theme, setTheme] = useState(() => {
    const stored = sessionStorage.getItem('appTheme');

    if (stored) {
      return JSON.parse(stored).theme;
    }
  });

  const updateUsername = (value: string) => {
    console.log('update theme....!!!!');
    setUsername(value);
    sessionStorage.setItem('userInfo', JSON.stringify({ username: value }))
  }
  const updateSetTheme = () => {
    const nextTheme = !theme;
    console.log('update theme....', theme);
    setTheme(nextTheme);
    sessionStorage.setItem('appTheme', JSON.stringify({ theme: nextTheme }));
  }
  return (
    <AppContext.Provider value={{ username, updateUsername, theme, updateSetTheme }}>{children}</AppContext.Provider>
  )
}
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider container');
  }
  return context;
}