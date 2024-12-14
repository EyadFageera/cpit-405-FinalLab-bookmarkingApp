import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, onRetrieveAll, onAddClick }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("id");

    const handleSearch = () => {
        onSearch(searchQuery, searchType);
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            value="id"
                            checked={searchType === "id"}
                            onChange={() => setSearchType("id")}
                        />
                        Search by ID
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="title"
                            checked={searchType === "title"}
                            onChange={() => setSearchType("title")}
                        />
                        Search by Title
                    </label>
                </div>
                <button onClick={onRetrieveAll} className="retrieve-button">Retrieve All</button>
                <button onClick={onAddClick} className="add-button">Add Bookmark</button>
            </div>
            <div className="info">
                Share button will copy the title and the link
            </div>
        </div>
    );
};

export default SearchBar;
