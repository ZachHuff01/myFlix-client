import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
  console.log(movie);
  return (
    <div>
      <div>
        <img className='w-100' src={movie.Image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Director Bio:</span>
        <span>{movie.Director.Bio}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Genre Description:</span>
        <span>{movie.Genre.Description}</span>
      </div>
      <button
        onClick={onBackClick}
        classname='back-button'
        style={{ cursor: 'pointer' }}
      >
        Back
      </button>
    </div>
  );
};
