import { useState, useEffect } from "react";

import { MovieCard } from "../MovieCard/movie-card";

import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://huff-movies-aa259f3af035.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log (data);
        const moviesFromApi = data.map((movies) => {
          return {
            _id: movies._id,
            Title: movies.Title,
            Image: 'imagepath.png',
            Description: movies.Description,
            Genre: {
                Name: movies.Genre.Name
              },
            Director: {
                Name: movies.Director.Name
              }
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);
};



const [selectedMovie, setSelectedMovie] = useState (null);

  if (selectedMovie) {
    return (
    <MovieView movie={selectedMovie} onBackClick={()=>
      setSelectedMovie(null)}/>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
      <div>
        {movies.map((movie) => (
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


