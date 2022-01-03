import React, { useState, useEffect } from "react";
import Catalog from "../../features/Catalog";
import IProduct from "../models/product";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div className="App">
      <h1>BigStore</h1>
      <Catalog products={products} />
    </div>
  );
}

export default App;
