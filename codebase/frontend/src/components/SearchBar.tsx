import React from 'react';
import "tailwindcss/tailwind.css";

const SearchBar = () => (
    <div className="p-8">
    <form className="bg-white flex items-center rounded-full w-full shadow-xl"
        action="/"
        method="get">
        <input className="rounded-l-auto w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
            id="ser-keywords"
            type="text"
            placeholder="Keywords (Software Developer, Python, Marketing, etc."
            name="keywords">
        </input>
        <input className="rounded-l-auto w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
            id="ser-location"
            type="text"
            placeholder="Location (Toronto, Ottawa, etc.)"
            name="location">
        </input>
        <div className="p-4">
        <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
            type="submit">
            Go
        </button>
        </div>
    </form>
    </div>
);

export default SearchBar;