import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { MovieID } = useParams();
  const movie = movies.find((movie) => movie._id === MovieID);

  console.log(MovieID);

  return (
    <div className='movie-view'>
      {' '}
      {/* Apply the movie-view class here */}
      <div>
        <img
          className='w-100'
          src={movie.ImagePath}
          alt={`Movie Poster for ${movie.Title}`}
        />
      </div>
      <div className='movie-details'>
        <div className='poster'>
          <img
            className='w-100'
            src={movie.ImagePath}
            alt={`Movie Poster for ${movie.Title}`}
          />
        </div>
        <div className='details'>
          <span>Title: </span>
          <span>{movie.Title}</span>
          <span>Description: </span>
          <span>{movie.Description}</span>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
          <span>Director Bio:</span>
          <span>{movie.Director.Bio}</span>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
          <span>Genre Description:</span>
          <span>{movie.Genre.Description}</span>
        </div>
      </div>
      <Link to={`/`}>
        <button className='back-button'>Back</button>
      </Link>
    </div>
  );
};
