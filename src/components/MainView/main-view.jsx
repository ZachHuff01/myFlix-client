import { useState, useEffect } from "react";

import { MovieCard } from "../MovieCard/movie-card";

import { MovieView } from "../MovieView/movie-view";


export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState (null);

  useEffect(() => {
    fetch("https://huff-movies-aa259f3af035.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {

        const moviesFromApi = data.map((movie) => {
          return {
            Id: movie._id,
            Title: movie.Title,
            Image: movie.ImagePath,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description
            },

            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio
            }

          };
        });

        setMovies(moviesFromApi);
      });
  }, []);



  if (selectedMovie) {
    return (
    <MovieView movie={selectedMovie} onBackClick={()=>
      setSelectedMovie(null)}/>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } 
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
          };

 export default MainView;



