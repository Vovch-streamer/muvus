import { useState, useEffect } from 'react'

import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState('');

  const selectRandomMovie = () => {
    const randomIndex = Math.ceil(Math.random() * movies.length);

    setRandomMovie(movies[randomIndex]);
  }

  useEffect(() => {
    fetch('/graphql', {
      method: 'POST',
      body: JSON.stringify({ "query": "query ExampleQuery {\n  movies {\n    name\n  }\n}\n", "variables": {}, "operationName": "ExampleQuery" }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(data => data.json())
      .then((parsed) => setMovies(parsed.data.movies))
      .catch((error) => console.log('error getting movies', error));
  }, [])

  useEffect(() => {
    if (movies?.length) {
      selectRandomMovie();
    }
  }, [movies])

  return (
    <>
      <header>
        <h1 className="app--heading">Muvus</h1>
      </header>
      <main className="app--body">
        <button onClick={selectRandomMovie} className="random-selector--button">Random</button>
        <section className="random-selector--movie">
          {randomMovie.name}
        </section>
        <table>
          <thead>
            <tr>
              <th className="movie-list-heading--cell">Name</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, i) => (
              <tr key={i}>
                <td className="movie-list--cell">{movie.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  )
};

export default App;
