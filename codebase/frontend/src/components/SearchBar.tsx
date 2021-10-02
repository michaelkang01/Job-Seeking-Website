import React from 'react'

const SearchBar = () => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search Listings</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search listings..."
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;