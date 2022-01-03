import { FormControl, InputLabel, MenuItem, Select, TextField, ThemeProvider } from "@mui/material";
import React, { useState, useEffect } from "react";
import Catalog from "../../features/Catalog";
import IProduct from "../models/product";
import theme from '../theme/theme'
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@mui/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

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
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        <StylesProvider jss={jss}>
          <div className="App" dir="rtl">
            <TextField placeholder="Name" variant="outlined" label="تست" />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <h1>BigStore</h1>
            <Catalog products={products} />
          </div>
        </StylesProvider>
      </CacheProvider>
    </ThemeProvider>
  );
}

export default App;
