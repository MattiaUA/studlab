import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./preview.css";

export default function SearchBar({ filters, setFilters }) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = e => {
    setSearch(e.target.value);
    setFilters({ ...filters, search: e.target.value });
  };

  const handleSearchClick = () => {
    navigate('/search-results', { state: { filters } });
  }

  return (
    <div className="search-bar">
      <button onClick={handleSearchClick} className="search-button">
        <img src="lense.png" alt="Lense search button" />
      </button>
      <input
        type="text"
        value={search}
        onChange={e => handleSearch(e)}
        placeholder="Autor o título"
        className="search-input"
      />
    </div>

  );
}
