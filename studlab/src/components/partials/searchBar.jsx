import React, { useState } from "react";
import "./preview.css";

export default function SearchBar() {
    const [search, setSearch] = useState("");
    
    return (
        <div className="search-bar">
        <button className="search-button"> <img src="lense.png" alt="Lense search button"/></button>
        <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Autor o título"
            className="search-input"
        />
        </div>
    );
}
