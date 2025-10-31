// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate ko import kiya
import './Header.css'; // Apni CSS file import ki

function Header() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if(query.trim()){
      navigate(`/search/${query}`);
      setQuery('');
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        MovieMagic 
      </Link>
      <form className="search-form" onSubmit={handleSubmit}>
        <input 
        type="text"
        className="search-input"
        placeholder='Search for a movie'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
}

export default Header;