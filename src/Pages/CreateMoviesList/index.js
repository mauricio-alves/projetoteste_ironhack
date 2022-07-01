import { useState } from "react";
import { Search } from "../../components/Search";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function CreateMoviesList({ movies, setMovies }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    title: "",
    movies: [],
  });

  function handleChange(event) {
    event.preventDefault();
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleMovie(currentMovie) {
    setForm({ ...form, movies: [...form.movies, currentMovie] });
    toast.success("Filme adicionado a sua lista!");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post("https://ironrest.herokuapp.com/mauricio-filmes", form);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <form
        style={{ maxWidth: "700px", marginLeft: "250px", marginBottom: "20px" }}
      >
        <div className="mb-3">
          <label htmlFor="input-name" className="form-label">
            Nome:{" "}
          </label>
          <input
            value={form.name}
            type="text"
            name="name"
            className="form-control"
            id="input-name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="input-title" className="form-label">
            Título da lista:{" "}
          </label>
          <input
            type="text"
            value={form.title}
            className="form-control"
            id="input-title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Criar lista
        </button>
      </form>

      <Search search={search} setSearch={setSearch} />

      <div className="d-flex flex-wrap">
        {movies
          .filter((currentMovie) => {
            return currentMovie.original_title
              .toLowerCase()
              .includes(search.toLowerCase());
          })
          .map((currentMovie) => {
            return (
              <div
                className="d-flex justify-content-center m-1"
                key={currentMovie.id}
              >
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
                    className="card-img-top"
                    alt="movie poster"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {currentMovie.original_title}
                    </h5>
                    <p className="card-text">
                      <b>Nota: {currentMovie.vote_average}</b>
                    </p>
                    <p className="card-text">{currentMovie.overview}</p>
                    <button
                      type="submit"
                      className="btn btn-info"
                      onClick={() => {
                        handleMovie(currentMovie);
                      }}
                    >
                      Adicionar a sua lista
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
