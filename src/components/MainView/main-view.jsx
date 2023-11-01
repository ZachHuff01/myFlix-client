import { useState, useEffect } from 'react';
import { MovieCard } from '../MovieCard/movie-card';
import { MovieView } from '../MovieView/movie-view';
import { LoginView } from '../LoginView/login-view';
import { SignupView } from '../SignUpView/signup-view';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) return;

    fetch('https://huff-movies-aa259f3af035.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);

        const moviesFromApi = movies.map((movie) => {
          return {
            Id: movie._id,
            Title: movie.Title,
            Image: movie.ImagePath,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description,
            },

            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
            },
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <Row className='justify-content-md-center'>
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
              localStorage.clear();
            }}
          />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className='mb-5' key={movie._Id} md={3}>
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
      {/* <Form>
        <Button variant='primary' type='submit'>
          Logout
        </Button>
      </Form> */}
    </Row>
  );
};

export default MainView;

// {
//   /* <button
// onClick={() => {
//   setUser(null);
//   setToken(null);
//   localStorage.clear();
// }}
// >
// Logout
// </button> */
// }
