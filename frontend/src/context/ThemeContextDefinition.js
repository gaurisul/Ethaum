import { createContext } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  preference: 'system',
  setPreference: () => {},
  toggleTheme: () => {},
});

export default ThemeContext;

