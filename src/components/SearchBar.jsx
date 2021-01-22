import React, { useState } from "react";

const SearchBar = ({
  products,
  setProducts,
  filteredProducts,
  setFilteredProducts,
}) => {
  const handleFilter = event => {
    if (products) setFilteredProducts(products);
    setFilteredProducts(
      products.filter(product =>
        product.game_title.includes(event.target.value)
      )
    );
    console.log(filteredProducts);
  };

  return (
    <div className="nes-field search-bar-wrapper">
      <label htmlFor="name_field">Search for your favourite game</label>
      <input
        type="text"
        id="name_field"
        className="nes-input is-dark"
        onChange={handleFilter}
      />
    </div>
  );
};

export default SearchBar;
