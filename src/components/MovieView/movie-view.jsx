export const MovieView = ({ movies, onBackClick}) => {
  return (
    <div>
      <div>
        <img src={movies.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movies.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movies.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movies.Director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movies.Genre}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};