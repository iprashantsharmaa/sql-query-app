import React from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function SearchBar({
  searchQuery,
  onChange,
}) {
  return (
    <div className="flex flex-1 items-center space-x-1 border border-blue-700 rounded p-2 mb-4 overflow-ellipsis">
      <input
        className="text-sm flex-1 bg-transparent text-blue-700 outline-0 placeholder:text-blue-600"
        id="search-input"
        placeholder="Search"
        value={searchQuery}
        onChange={({ target: { value } }) => onChange(value)}
      />
      <SearchRoundedIcon fontSize="small" className="text-blue-700" />
    </div>
  );
}

export default SearchBar;
