import { useQuery } from "@apollo/client";
import { useState, useEffect, useCallback } from "react";
import { GET_MOVIES_QUERY } from "./graphql/queries/getMovies.js";

import "./App.css";

const App = () => {
  const [randomMovie, setRandomMovie] = useState("");
  const { loading, error, data: moviesData } = useQuery(GET_MOVIES_QUERY);

  const selectRandomMovie = useCallback(() => {
    const randomIndex = Math.ceil(Math.random() * moviesData.movies.length);

    setRandomMovie(moviesData.movies[randomIndex]);
  }, [moviesData]);

  useEffect(() => {
    if (moviesData?.movies.length) {
      selectRandomMovie();
    }
  }, [moviesData, selectRandomMovie]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <header>
        <h1 className="app--heading">Muvus</h1>
      </header>
      <main className="app--body">
        <button onClick={selectRandomMovie} className="random-selector--button">
          Random
        </button>
        <section className="random-selector--movie">{randomMovie.name}</section>
        <table>
          <thead>
            <tr>
              <th className="movie-list-heading--cell">Name</th>
            </tr>
          </thead>
          <tbody>
            {moviesData?.movies.map((movie, i) => (
              <tr key={i}>
                <td className="movie-list--cell">{movie.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default App;
