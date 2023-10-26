// Here you import the PropTypes library
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  console.log('movie card', movie)
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title},
      
    </div>
  );
};

// // Here is where we define all the props constraints for the BookCard
// MovieCard.propTypes = {
//   movies: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Image: PropTypes.string,
//     Description: PropTypes.string,
//     Director: PropTypes.string,
//     Genre: PropTypes.string
  
//   }).isRequired,
//   onMovieClick: PropTypes.func.isRequired
// };
