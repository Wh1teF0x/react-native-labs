import React, { createContext, useState } from 'react';
import { DefaultTheme, Provider } from 'react-native-paper';

export const ThemeContext = createContext(null);

export default ({ children }) => {
  const [theme, changeTheme] = useState(DefaultTheme);
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <Provider theme={theme}>
        {children}
      </Provider>
    </ThemeContext.Provider>
  );
};
