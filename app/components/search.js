'use client';
import React, { useState } from "react";
import Link from "next/link";
import ProductData from "./fetchdata";

export default function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const data = ProductData(); // Fetch product data

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResult([]); 
      return;
    }

    const results = data.filter(
      (item) =>
        (item.brand && item.brand.toLowerCase().includes(query.toLowerCase())) ||
        (item.model && item.model.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResult(results);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
      />

      {searchResult.length > 0 && (
        <div>
          <h4>Simillar Results</h4>
          <ul>
            {searchResult.map((item) => (
              <li key={item.id}>
                <Link href={`/categories/${item.model}`}>
                  {item.brand} - {item.model}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchQuery && searchResult.length === 0 && (
        <p>No results found for "{searchQuery}".</p>
      )}
    </div>
  );
}
