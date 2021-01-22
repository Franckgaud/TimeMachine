import React, { useState, useEffect } from "react";
import Product from "./Product";
import SearchBar from "./SearchBar";

import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState();

  const getProducts = () =>
    axios.get("/item/").then(res => {
      setProducts(res.data);
      setFilteredProducts(res.data);
    });
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <SearchBar
        products={products}
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
        setProducts={setProducts}
      />
      <div className="product-list-wrapper">
        {filteredProducts &&
          filteredProducts.map(product => (
            <Product product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
};

export default ProductList;
