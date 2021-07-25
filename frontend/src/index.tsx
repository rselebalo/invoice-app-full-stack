import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import Navigation from './navigation';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './utils/global';
import { lightTheme, darkTheme } from './utils/theme';
import { ThemeContext } from './contexts/index';

import './index.css';

const App: React.FC<any> = () => {
  const themeContext = useContext(ThemeContext);
  const themeMode = themeContext.themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <Navigation />
      </>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
