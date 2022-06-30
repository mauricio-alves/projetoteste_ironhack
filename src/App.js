import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/index.js";
import { Home } from "./Pages/Home";
import { CreateMoviesList } from "./Pages/CreateMoviesList";
import { UserList } from "./Pages/UserList/index.js";
import { useEffect, useState } from "react";
import axios from "axios";

export function App() {
  const [movies, setMovies] = useState([]);

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

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/movies"
          element={<CreateMoviesList movies={movies} setMovies={setMovies} />}
        />
        <Route path="/movies/user-list" element={<UserList />} />
      </Routes>
    </div>
  );
}
