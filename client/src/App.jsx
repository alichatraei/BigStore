import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div className="App">
      <h1>BigStore</h1>

      <ul>
        {products &&
          products.map((item, index) => (
            <li key={index}>{item?.productName} </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
