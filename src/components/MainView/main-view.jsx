import { useState, useEffect } from "react";

import { MovieCard } from "../MovieCard/movie-card";

import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://huff-movies-aa259f3af035.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log ("movies from api", data);
        const moviesFromApi = data.map((movies) => {
          return {
            Id: movies._id,
            Title: movies.Title,
            Image: 'imagepath.png',
            Description: movies.Description,
            Genre: movies.Genre,

          };
        });

        setMovies(moviesFromApi);
      });
  }, []);




const [selectedMovie, setSelectedMovie] = useState (null);

  if (selectedMovie) {
    return (
    <MovieView movies={selectedMovie} onBackClick={()=>
      setSelectedMovie(null)}/>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } 
    return (
      <div>
        {movies.map((movies) => (
          <MovieCard
            key={movies._id}
            movies={movies}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
          };


