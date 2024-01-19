import React, { useState, useEffect } from 'react';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [searchMovie, setSearchMovie] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://dummyapi.online/api/movies');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);
    const handleSearch = (event) => {
        setSearchMovie(event.target.value);
    };

    const filteredMovies = movies.filter((movie) =>
        movie.movie.toLowerCase().includes(searchMovie.toLowerCase())
    );

    return (
        <div className='container'>
            <h1 className='heading'>Top Rated Movies</h1>
            <input
                type="text"
                placeholder="Search by movie name"
                value={searchMovie}
                onChange={handleSearch}
            />
            <ul className='movies-list'>
                {filteredMovies.map((movie) => (
                    <li className='list-item' key={movie.id}>
                        {/* <h2 className='id'>Id: {movie.id}</h2> */}
                        <h2 className='movie-name'> {movie.movie}</h2>
                        <p className='movie-rating'>Rating: {movie.rating}</p>
                        <img src={movie.image} alt={movie.movie} className='movie-poster' />
                        <br />
                        <a href={movie.imdb_url} target="_blank" rel="noopener noreferrer" className='movie-link'>
                            IMDb Link
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieList;

