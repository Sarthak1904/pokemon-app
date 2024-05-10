import React, { useState, useEffect } from 'react';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const names = data.results.map(pokemon => pokemon.name).sort();
        setPokemon(names);
        setTotalPages(Math.ceil(names.length / 10));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Pokemon List</h1>
      <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
      <span>Page {currentPage}</span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
      <ul>
        {pokemon.slice(startIndex, endIndex).map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
