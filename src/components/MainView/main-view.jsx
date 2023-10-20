import { useState } from "react";

import { MovieCard } from "../MovieCard/movie-card";

import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Zootopia",
      image: "https://lumiere-a.akamaihd.net/v1/images/movie_poster_zootopia_866a1bf2.jpeg",
      description: "In a city of anthropomorphic animals, a rookie bunny cop and a cynical con artist fox must work together to uncover a conspiracy.",
      director: "Byron Howard, Rich Moore, Jared Bush",
      genre: "Comedy"
    },
    
    {
      id: 2,
      title: "The Longest Yard",
      image: "https://m.media-amazon.com/images/I/6170kKD3zGL._AC_UF894,1000_QL80_.jpg",
      description: "Prison inmates form a football team to challenge the prison guards.",
      director: "Peter Segal",
      genre: "Comedy"
    },
    {
      id: 3,
      title: "The Hobbit: An Unexpected Journey",
      image: "https://www.themoviedb.org/t/p/w500/yHA9Fc37VmpUA5UncTxxo3rTGVA.jpg",
      description: "An Unexpected Journey tells the tale of Bilbo Baggins (Martin Freeman), who is convinced by the wizard Gandalf (Ian McKellen) to accompany thirteen Dwarves, led by Thorin Oakenshield (Richard Armitage), on a quest to reclaim the Lonely Mountain from the dragon Smaug.",
      director: "Peter Jackson",
      genre: "Action, Adventure"
    }
 
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
  }
};
