import { useState, useEffect } from 'react';
import { MovieCard } from '../MovieCard/movie-card';
import { MovieView } from '../MovieView/movie-view';
import { LoginView } from '../LoginView/login-view';
import { SignupView } from '../SignUpView/signup-view';
import { NavigationBar } from '../NavigationBar/navigation-bar';
import { ProfileView } from '../ProfileView/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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

        // const moviesFromApi = movies.map((movie) => {
        //   return {
        //     Id: movie._id,
        //     Title: movie.Title,
        //     Image: movie.ImagePath,
        //     Description: movie.Description,
        //     Genre: {
        //       Name: movie.Genre.Name,
        //       Description: movie.Genre.Description,
        //     },

        //     Director: {
        //       Name: movie.Director.Name,
        //       Bio: movie.Director.Bio,
        //     },
        //   };
        // });

        // setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row className='justify-content-md-center'>
        <Routes>
          <Route
            path='/login'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        localStorage.clear();
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path='/signup'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path='/movies/:MovieID'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path='/'
            element={
              <>
                {!user ? (
                  <Navigate to='login' replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col classname='mb-4' key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          setUser={setUser}
                          token={token}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

          <Route
            path='/profile'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : (
                  <Col>
                    <Row>
                      <ProfileView
                        user={user}
                        token={token}
                        setUser={setUser}
                        movies={movies}
                        onDelete={() => {
                          setUser(null);
                          setToken(null);
                          localStorage.clear();
                        }}
                      />
                    </Row>
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
