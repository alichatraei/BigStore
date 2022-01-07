import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState, useEffect } from "react";
import Catalog from "../../features/Catalog";
import IProduct from "../models/product";
import theme, { themeMode } from '../theme/theme'
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@mui/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Header from "./Header";

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

function App() {
  const [darkMode, setDarkMode] = useState(false);
  // Change dark mode
  const changeDarkMode = () => {
    setDarkMode(!darkMode);
  }
  const theme2 = createTheme({
    ...theme,
    palette: {
      mode: darkMode ? 'dark' : 'light'
    }
  })
  return (
    <ThemeProvider theme={theme2}>
      <CacheProvider value={cacheRtl}>
        <StylesProvider jss={jss}>
          <CssBaseline />
          <div className="App">
            <Header darkMode={darkMode} changeDarkMode={changeDarkMode} />
            <Container>
              <Catalog />
            </Container>
          </div>
        </StylesProvider>
      </CacheProvider>
    </ThemeProvider>
  );
}

export default App;
