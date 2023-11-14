// Here you import the PropTypes library
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const MovieCard = ({ movie, token, setUser, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if user and user.favoriteMovies are defined
    if (user && user.FavoriteMovies) {
      // Check if movie._id is defined
      if (movie && movie.Id) {
        if (user.FavoriteMovies.includes(movie)) {
          setIsFavorite(true);
        }
      } else {
        console.error('Movie or movie._id is not defined.');
      }

      // Filter movies with error handling
      let FavoriteMovies;
      if (Array.isArray(movie) && Array.isArray(user.FavoriteMovies)) {
        FavoriteMovies = movie.filter((movie) =>
          user.FavoriteMovies.includes(movie)
        );
      } else {
        console.error('Movie or user.FavoriteMovies is not an array.');
      }

      console.log(FavoriteMovies);
    } else {
      console.error('User or user.favoriteMovies is not defined.');
    }
  }, [user, movie, setUser]);

  useEffect(() => {
    if (user.FavoriteMovies && user.FavoriteMovies.includes(movie.Id)) {
      setIsFavorite(true);
    }
  }, [user]);

  const addFavorite = () => {
    fetch(
      `https://huff-movies-aa259f3af035.herokuapp.com/users/${user.Username}/movies/${movie.Id}`,
      { method: 'POST', headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log('Failed to add fav movie');
        }
      })
      .then((user) => {
        if (user) {
          alert('successfully added to favorites');
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavorite = () => {
    fetch(
      `https://huff-movies-aa259f3af035.herokuapp.com/users/${user.Username}/movies/${movie.Id}`,
      { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Failed');
        }
      })
      .then((user) => {
        if (user) {
          alert('successfully deleted from favorites');
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Card className='p-1 border-0 h-100'>
      <Card.Img className='m-3' src={movie.Image} />

      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.Id)}`}>
          <Button className='close-open-btn'>Open</Button>
        </Link>

        <Card.Body className='favorite-btns'>
          {!isFavorite ? (
            <Button className='fav-btn' onClick={addFavorite}>
              +
            </Button>
          ) : (
            <Button className='fav-btn' onClick={removeFavorite}>
              -
            </Button>
          )}
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

// // Here is where we define all the props constraints for the Movie-Card
MovieCard.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Image: PropTypes.string,
    Description: PropTypes.string,
    Director: PropTypes.string,
    Genre: PropTypes.string,
  }),
};
// };
