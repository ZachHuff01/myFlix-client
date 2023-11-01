// Here you import the PropTypes library
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
  console.log('movie card', movie);
  return (
    <Card className='h-100' onClick={() => onMovieClick(movie)}>
      <Card.Img variant='top' src={movie.Image} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

// // Here is where we define all the props constraints for the BookCard
MovieCard.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Image: PropTypes.string,
    Description: PropTypes.string,
    Director: PropTypes.string,
    Genre: PropTypes.string,
  }),
  onMovieClick: PropTypes.func.isRequired,
};
