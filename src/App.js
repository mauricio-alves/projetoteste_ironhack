import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/index.js";
import { Home } from "./Pages/Home";
import { CreateMoviesList } from "./Pages/CreateMoviesList";
import { UserList } from "./Pages/UserList/index.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { EditMoviesList } from "./Pages/EditMoviesList/index.js";
import { NotFound } from "./Pages/NotFound/index.js";
import { Footer } from "./components/Footer/index.js";

export function App() {
  const [movies, setMovies] = useState([]);
  const [moviesDB, setMoviesDB] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie?api_key=3273e83a747e67cc9017e1a82286b180"
        );
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          "https://ironrest.herokuapp.com/mauricio-filmes"
        );
        setMoviesDB(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovies();
  }, [moviesDB]);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home moviesDB={moviesDB} setMoviesDB={setMoviesDB} />}
        />
        <Route
          path="/movies"
          element={<CreateMoviesList movies={movies} setMovies={setMovies} />}
        />
        <Route path="/user-list/:id" element={<UserList />} />
        <Route
          path="/edit-list/:id"
          element={<EditMoviesList movies={movies} setMovies={setMovies} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
