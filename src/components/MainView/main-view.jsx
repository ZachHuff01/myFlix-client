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
        const moviesFromApi = movies.map((movie) => {
          return {
            Id: movie._id,
            Title: movie.Title,
            Image: 'imagepath.png',
            Description: movie.Description,
            Genre: movie.Genre,

            Genre: {
                Name: movie.Genre.Name,
              },
            Director: {
                Name: movie.Director.Name
              }
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
            key={movies.id}
            movie={movies}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
          };


