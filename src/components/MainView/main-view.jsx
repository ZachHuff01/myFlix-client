import { useState, useEffect } from "react";

import { MovieCard } from "../MovieCard/movie-card";

import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movie, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://huff-movies-aa259f3af035.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log (data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Image: 'imagepath.png',
            Description: movie.Description,
            Genre: movie.Genre,

            Genre: {
                Name: movie.Genre.Name
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
    <MovieView movie={selectedMovie} onBackClick={()=>
      setSelectedMovie(null)}/>
    );
  }

  if (movie.length === 0) {
    return <div>The list is empty!</div>;
  } 
    return (
      <div>
        {movie.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
          };


