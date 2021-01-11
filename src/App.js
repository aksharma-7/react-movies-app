import React, { useEffect, useState } from "react";


import Movie from "./components/Movie";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie/?sort_by=popularity.desc&api_key=a970d139338d6d9d9f2e3a445c6c3b2f&page=1"

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=a970d139338d6d9d9f2e3a445c6c3b2f&query="

function App() {
  const [movies, setMovies ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');

  useEffect(() => {
    getMovies(FEATURED_API)

  }, [])

  const getMovies = (API) => {
    fetch(API)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setMovies(data.results);
        });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(searchTerm) {
      getMovies(SEARCH_API + searchTerm)
      setSearchTerm('');
    }
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <header>
          <input 
            className="search"
            type="search" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={handleOnChange}
          />
        </header>
      </form>
      
      <div className="movie-container">
        {movies.length > 0 && movies.map(movie => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

export default App;
