import React, { useState } from "react";
import "./preview.css";

export default function SearchBar({ filters, setFilters }) {    
    const [search, setSearch] = useState('');
    const handleSearch = e => {
        setSearch(e.target.value);
        setFilters({ ...filters, search: e.target.value });
    };
    
    return (
        <div className="search-bar">
        <button className="search-button"> <img src="lense.png" alt="Lense search button"/></button>
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
