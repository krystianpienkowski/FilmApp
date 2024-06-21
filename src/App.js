import React, { useEffect, useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import Lista from "./components/Lista";
import ListaHeading from "./components/ListaHeading";
import SearchBox from "./components/SearchBox";
import Watchlist from "./components/Watchlist";
import RemoveWatchlist from "./components/RemoveWatchlist";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const [avengersMovies, setAvengersMovies] = useState([]);
  const [batmanMovies, setBatmanMovies] = useState([]);
  const [matrixMovies, setMatrixMovies] = useState([]);
  const [terminatorMovies, setTerminatorMovies] = useState([]);
  const [taxiMovies, setTaxiMovies] = useState([]);
  const [toyStoryMovies, setToyStoryMovies] = useState([]);
  const [carsMovies, setCarsMovies] = useState([]);

  const [scrollDirection, setScrollDirection] = useState({
    search: null,
    watchlist: null,
    avengers: null,
    batman: null,
    matrix: null,
    terminator: null,
    taxi: null,
    toyStory: null,
    cars: null,
  });

  const searchRef = useRef(null);
  const watchlistRef = useRef(null);
  const avengersRef = useRef(null);
  const batmanRef = useRef(null);
  const matrixRef = useRef(null);
  const terminatorRef = useRef(null);
  const taxiRef = useRef(null);
  const toyStoryRef = useRef(null);
  const carsRef = useRef(null);

  const getMovieRequest = async (searchTerm, setMoviesFunction) => {
    const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=daba5ce8`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMoviesFunction(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest("Avengers", setAvengersMovies);
    getMovieRequest("Batman", setBatmanMovies);
    getMovieRequest("Matrix", setMatrixMovies);
    getMovieRequest("Terminator", setTerminatorMovies);
    getMovieRequest("Taxi", setTaxiMovies);
    getMovieRequest("Toy Story", setToyStoryMovies);
    getMovieRequest("Cars", setCarsMovies);
  }, []);

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('filmapp-watchlist')) || [];
    setFavourites(movieFavourites);
  }, []);

  useEffect(() => {
    if (searchValue.trim() !== '') {
      getMovieRequest(searchValue, setMovies);
    }
  }, [searchValue]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('filmapp-watchlist', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const alreadyInFavourites = favourites.some(favourite => favourite.imdbID === movie.imdbID);

    if (!alreadyInFavourites) {
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    } else {
      alert("Ten film jest już na Twojej Watchliście!");
    }
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const scroll = (ref, direction) => {
    const scrollAmount = 10;
    if (direction === 'left') {
      ref.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'right') {
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let scrollInterval;
    if (scrollDirection.search) {
      scrollInterval = setInterval(() => {
        scroll(searchRef, scrollDirection.search);
      }, 30);
    }
    return () => clearInterval(scrollInterval);
  }, [scrollDirection.search]);

  useEffect(() => {
    let scrollInterval;
    if (scrollDirection.watchlist) {
      scrollInterval = setInterval(() => {
        scroll(watchlistRef, scrollDirection.watchlist);
      }, 30);
    }
    return () => clearInterval(scrollInterval);
  }, [scrollDirection.watchlist]);

  useEffect(() => {
    let scrollInterval;
    if (scrollDirection.avengers) {
      scrollInterval = setInterval(() => {
        scroll(avengersRef, scrollDirection.avengers);
      }, 30);
    }
    return () => clearInterval(scrollInterval);
  }, [scrollDirection.avengers]);

  useEffect(() => {
    let scrollInterval;
    if (scrollDirection.batman) {
      scrollInterval = setInterval(() => {
        scroll(batmanRef, scrollDirection.batman);
      }, 30);
    }
    return () => clearInterval(scrollInterval);
  }, [scrollDirection.batman]);

  useEffect(() => {
    let scrollInterval;
    if (scrollDirection.matrix) {
      scrollInterval = setInterval(() => {
        scroll(matrixRef, scrollDirection.matrix);
      }, 30);
    }
    return () => clearInterval(scrollInterval);
  }, [scrollDirection.matrix]);

  useEffect(() => {
    let scrollInterval;
    if (scrollDirection.terminator) {
      scrollInterval = setInterval(() => {
        scroll(terminatorRef, scrollDirection.terminator);
      }, 30);
    }
    return () => clearInterval(scrollInterval);
  }, [scrollDirection.terminator]);

  useEffect(() => {
    let scrollInterval;
    if (scrollDirection.taxi) {
      scrollInterval = setInterval(() => {
        scroll(taxiRef, scrollDirection.taxi);
      }, 30);
    }
    return () => clearInterval(scrollInterval);
  }, [scrollDirection.taxi]);

  useEffect(() => {
    let scrollInterval;
    if (scrollDirection.toyStory) {
      scrollInterval = setInterval(() => {
        scroll(toyStoryRef, scrollDirection.toyStory);
      }, 30);
    }
    return () => clearInterval(scrollInterval);
  }, [scrollDirection.toyStory]);

  useEffect(() => {
    let scrollInterval;
    if (scrollDirection.cars) {
      scrollInterval = setInterval(() => {
        scroll(carsRef, scrollDirection.cars);
      }, 30);
    }
    return () => clearInterval(scrollInterval);
  }, [scrollDirection.cars]);

  const handleMouseMove = (e, key) => {
    const refMap = {
      search: searchRef,
      watchlist: watchlistRef,
      avengers: avengersRef,
      batman: batmanRef,
      matrix: matrixRef,
      terminator: terminatorRef,
      taxi: taxiRef,
      toyStory: toyStoryRef,
      cars: carsRef,
    };

    const ref = refMap[key];

    const halfWidth = ref.current.clientWidth / 2;
    if (e.clientX > halfWidth) {
      setScrollDirection((prev) => ({ ...prev, [key]: 'right' }));
    } else {
      setScrollDirection((prev) => ({ ...prev, [key]: 'left' }));
    }
  };

  const handleMouseLeave = (key) => {
    setScrollDirection((prev) => ({ ...prev, [key]: null }));
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="navbar-custom">
        <Container fluid>
          <Navbar.Brand href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" className="navbar-logo">
            FilmApp
          </Navbar.Brand>
          <div className="d-flex flex-grow-1 me-3">
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
          <Nav>
            <Button className="custom-button" href="#watchlist-section">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmarks-fill" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5z"/>
                <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1z"/>
              </svg>
              Do obejrzenia
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <div className='container-fluid filmapp'>
        {searchValue.trim() !== '' && (
          <>
            <div className='row d-flex align-items-center mt-4 mb-4'>
              <ListaHeading heading={`Wyniki wyszukiwania: ${searchValue}`} />
            </div>
            <div className='row movies-row' ref={searchRef}
              onMouseEnter={() => setScrollDirection((prev) => ({ ...prev, search: 'right' }))}
              onMouseLeave={() => handleMouseLeave('search')}
              onMouseMove={(e) => handleMouseMove(e, 'search')}>
              <Lista movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={Watchlist} />
            </div>
          </>
        )}

        <div className="video-container">
          <video className="video" width="100%" autoPlay muted loop style={{ display: 'block' }}>
            <source src="/video/jw.mp4" type="video/mp4" />
            Przepraszamy, twoja przeglądarka nie obsługuje osadzonych wideo.
          </video>
          <div className="video-text">John Wick 4</div>
        </div>

        {/* Sekcja "Do obejrzenia" */}
        <div id="watchlist-section" className='row d-flex align-items-center mt-4 mb-0'>
          <ListaHeading heading="Do obejrzenia" />
        </div>
        <div className='row movies-row' ref={watchlistRef}
          onMouseEnter={() => setScrollDirection((prev) => ({ ...prev, watchlist: 'right' }))}
          onMouseLeave={() => handleMouseLeave('watchlist')}
          onMouseMove={(e) => handleMouseMove(e, 'watchlist')}>
          {favourites.length === 0 ? (
            <div className="col-sm-6 col-md-4 col-lg-2">
              <div className="empty-list-container">
                <div className="empty-list-text">Dodaj coś do listy</div>
              </div>
            </div>
          ) : (
            <Lista movies={favourites} handleFavouritesClick={removeFavouriteMovie} favouriteComponent={RemoveWatchlist} />
          )}
        </div>

        {/* Sekcja dla "Avengers" */}
        <div className='row d-flex align-items-center mt-0 mb-0'>
          <ListaHeading heading="Avengers" />
        </div>
        <div className='row movies-row' ref={avengersRef}
          onMouseEnter={() => setScrollDirection((prev) => ({ ...prev, avengers: 'right' }))}
          onMouseLeave={() => handleMouseLeave('avengers')}
          onMouseMove={(e) => handleMouseMove(e, 'avengers')}>
          <Lista movies={avengersMovies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={Watchlist} />
        </div>

        {/* Sekcja dla "Batman" */}
        <div className='row d-flex align-items-center mt-0 mb-0'>
          <ListaHeading heading="Batman" />
        </div>
        <div className='row movies-row' ref={batmanRef}
          onMouseEnter={() => setScrollDirection((prev) => ({ ...prev, batman: 'right' }))}
          onMouseLeave={() => handleMouseLeave('batman')}
          onMouseMove={(e) => handleMouseMove(e, 'batman')}>
          <Lista movies={batmanMovies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={Watchlist} />
        </div>

        {/* Sekcja dla "Matrix" */}
        <div className='row d-flex align-items-center mt-0 mb-0'>
          <ListaHeading heading="Matrix" />
        </div>
        <div className='row movies-row' ref={matrixRef}
          onMouseEnter={() => setScrollDirection((prev) => ({ ...prev, matrix: 'right' }))}
          onMouseLeave={() => handleMouseLeave('matrix')}
          onMouseMove={(e) => handleMouseMove(e, 'matrix')}>
          <Lista movies={matrixMovies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={Watchlist} />
        </div>

        {/* Sekcja dla "Terminator" */}
        <div className='row d-flex align-items-center mt-0 mb-0'>
          <ListaHeading heading="Terminator" />
        </div>
        <div className='row movies-row' ref={terminatorRef}
          onMouseEnter={() => setScrollDirection((prev) => ({ ...prev, terminator: 'right' }))}
          onMouseLeave={() => handleMouseLeave('terminator')}
          onMouseMove={(e) => handleMouseMove(e, 'terminator')}>
          <Lista movies={terminatorMovies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={Watchlist} />
        </div>

        {/* Sekcja dla "Taxi" */}
        <div className='row d-flex align-items-center mt-0 mb-0'>
          <ListaHeading heading="Taxi" />
        </div>
        <div className='row movies-row' ref={taxiRef}
          onMouseEnter={() => setScrollDirection((prev) => ({ ...prev, taxi: 'right' }))}
          onMouseLeave={() => handleMouseLeave('taxi')}
          onMouseMove={(e) => handleMouseMove(e, 'taxi')}>
          <Lista movies={taxiMovies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={Watchlist} />
        </div>

        {/* Sekcja dla "Toy Story" */}
        <div className='row d-flex align-items-center mt-0 mb-0'>
          <ListaHeading heading="Toy Story" />
        </div>
        <div className='row movies-row' ref={toyStoryRef}
          onMouseEnter={() => setScrollDirection((prev) => ({ ...prev, toyStory: 'right' }))}
          onMouseLeave={() => handleMouseLeave('toyStory')}
          onMouseMove={(e) => handleMouseMove(e, 'toyStory')}>
          <Lista movies={toyStoryMovies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={Watchlist} />
        </div>

        {/* Sekcja dla "Cars" */}
        <div className='row d-flex align-items-center mt-0 mb-0'>
          <ListaHeading heading="Cars" />
        </div>
        <div className='row movies-row' ref={carsRef}
          onMouseEnter={() => setScrollDirection((prev) => ({ ...prev, cars: 'right' }))}
          onMouseLeave={() => handleMouseLeave('cars')}
          onMouseMove={(e) => handleMouseMove(e, 'cars')}>
          <Lista movies={carsMovies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={Watchlist} />
        </div>
      </div>
      {/* Dodajemy stopkę na dole strony */}
      <footer className="footer">
        © Krystian Pienkowski
      </footer>
    </>
  );
};

export default App;
