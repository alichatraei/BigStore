import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import theme from '../theme/theme'
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@mui/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Home from "../../features/Home/Home";
import ContactPage from "../../features/ContactPage/ContactPage";
import AboutPage from "../../features/AboutPage/AboutPage";
import Catalog from "../../features/Products/Catalog";


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
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Catalog />} />
                <Route path="/contactus" element={<ContactPage />} />
                <Route path="/aboutus" element={<AboutPage />} />
              </Routes>
            </Container>
          </div>
        </StylesProvider>
      </CacheProvider>
    </ThemeProvider >
  );
}

export default App;
