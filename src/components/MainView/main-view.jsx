import { useState } from "react";

import { MovieCard } from "../MovieCard/movie-card";

import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Zootopia",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdisney.fandom.com%2Fwiki%2FZootopia%2FGallery&psig=AOvVaw01bzq_3imoR6ggXvwearfq&ust=1697912448923000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLiYtPiehYIDFQAAAAAdAAAAABAE",
      description: "In a city of anthropomorphic animals, a rookie bunny cop and a cynical con artist fox must work together to uncover a conspiracy.",
      director: "Byron Howard, Rich Moore, Jared Bush",
      genre: "Comedy"
    },
    
    {
      id: 2,
      title: "The Longest Yard",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FThe_Longest_Yard_%25282005_film%2529&psig=AOvVaw3twc3pxg-wrZ8x4Gy8qmxC&ust=1697912879554000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOiFv8WghYIDFQAAAAAdAAAAABAE",
      description: "Prison inmates form a football team to challenge the prison guards.",
      director: "Peter Segal",
      genre: "Comedy"
    },
    {
      id: 3,
      title: "The Hobbit: An Unexpected Journey",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FHobbit-Unexpected-Sir-Ian-McKellen%2Fdp%2FB00BWJ6JO4&psig=AOvVaw2OCynjTxA30mWz14B4rbll&ust=1697913247770000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJiixPOhhYIDFQAAAAAdAAAAABAE",
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
              setSelectedBook(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  }
};
