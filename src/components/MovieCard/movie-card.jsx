// Here you import the PropTypes library
import PropTypes from "prop-types";

export const MovieCard = ({ movies, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movies);
      }}
    >
      {movies.Title}
    </div>
  );
};

// Here is where we define all the props constraints for the BookCard
MovieCard.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string,
    Image: PropTypes.string,
    Description: PropTypes.string,
    Director: PropTypes.string,
    Genre: PropTypes.shape({
    })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
