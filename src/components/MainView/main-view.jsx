import { React } from 'react';
import { useState, useEffect } from 'react';
import { MovieCard } from '../MovieCard/movie-card';
import { MovieView } from '../MovieView/movie-view';
import { LoginView } from '../LoginView/login-view';
import { SignupView } from '../SignUpView/signup-view';
import { NavigationBar } from '../NavigationBar/navigation-bar';
import { ProfileView } from '../ProfileView/profile-view';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './main-view.scss';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  // An array of all genres for my filter function
  const genres = [];
  movies.forEach((movie) => {
    if (genres.indexOf(movie.Genre.Name) === -1) {
      genres.push(movie.Genre.Name);
    }
  });

  useEffect(() => {
    if (!token) return;

    fetch('https://huff-movies-aa259f3af035.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const filteredMovies = movies.filter(
          (movie) =>
            (!filterTerm || movie.Genre.Name === filterTerm) &&
            (!searchTerm ||
              movie.Title.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        setMovies(filteredMovies);
      });
  }, [token, filterTerm, searchTerm]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setFilterTerm(null); // Reset genre filter when user logs out
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
                <Row className='searchContainer d-flex mt-4'>
                  <Form.Control
                    type='text'
                    placeholder='Search...'
                    className='search-bar'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    // onChange={handleChange}
                    // onChange={(e) => handleSearch(e.target.value)}
                    id='movie-search'
                  />
                  {/* Set up a dropdown menu populated with each movie genre I can filter by */}
                  <Form.Select
                    className='filter-bar'
                    onChange={(e) => setFilterTerm(e.target.value)}
                    value={filterTerm}
                  >
                    <option value=''>All Genres</option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </Form.Select>
                </Row>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies
                      .filter((movie) => {
                        if (searchTerm === '' && filterTerm === '') {
                          return movie;
                        } else if (
                          searchTerm !== '' &&
                          movie.Title.toLowerCase().includes(
                            searchTerm.toLowerCase()
                          )
                        ) {
                          if (filterTerm !== '') {
                            return movie.Genre.Name.toLowerCase().includes(
                              filterTerm.toLowerCase()
                            );
                          } else {
                            return movie;
                          }
                        } else if (
                          filterTerm !== '' &&
                          movie.Genre.Name.toLowerCase().includes(
                            filterTerm.toLowerCase()
                          )
                        ) {
                          if (searchTerm !== '') {
                            return movie.Title.toLowerCase().includes(
                              searchTerm.toLowerCase()
                            );
                          } else {
                            return movie;
                          }
                        }
                      })
                      .map((movie) => (
                        <Col
                          key={movie.id}
                          sm={6}
                          md={4}
                          lg={3}
                          className='mb-3 mt-3 cardContainer'
                        >
                          <MovieCard
                            movie={movie}
                            user={user}
                            token={token}
                            setUser={setUser}
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
