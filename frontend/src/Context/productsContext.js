import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

// Create a context
export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/products/getProducts"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
  }, []);

  return (
    // Provide the products data to the context
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
