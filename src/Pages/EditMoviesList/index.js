import { useEffect, useState } from "react";
import { Search } from "../../components/Search";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function EditMoviesList({ movies, setMovies }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    title: "",
    movies: [],
  });

  useEffect(() => {
    async function fetchList() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/mauricio-filmes/${id}`
        );
        setForm({ ...response.data });
      } catch (error) {
        console.log(error);
      }
    }
    fetchList();
  }, [id]);

  function handleChange(event) {
    event.preventDefault();
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleMovie(currentMovie) {
    setForm({ ...form, movies: [...form.movies, currentMovie] });
    toast.success("Filme adicionado a sua lista!");
  }

  function handleDelete(movie) {
    const clone = { ...form };
    const updatedList = clone.movies.filter((currentMovie) => {
      return movie !== currentMovie;
    });
    setForm({ ...form, movies: updatedList });
    toast.error("Filme removido da sua lista!");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const clone = { ...form };
      delete clone._id;
      await axios.put(
        `https://ironrest.herokuapp.com/mauricio-filmes/${id}`,
        clone
      );
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
            Edite seu nome:
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
            Edite o título da lista:
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
          Salvar lista
        </button>
      </form>

      {form.movies.map((currentMovie) => {
        return (
          <div className="card" style={{ width: "18rem" }}>
            <img
              src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
              className="card-img-top"
              alt="movie poster"
            />
            <div className="card-body">
              <h5 className="card-title">{currentMovie.title}</h5>
              <p className="card-text">{currentMovie.overview}</p>
            </div>
            <button
              onClick={() => {
                handleDelete(currentMovie);
              }}
              className="btn btn-danger mb-3"
            >
              Remover filme da lista
            </button>
          </div>
        );
      })}

      <Search search={search} setSearch={setSearch} />
      {movies
        .filter((currentMovie) => {
          return currentMovie.original_title
            .toLowerCase()
            .includes(search.toLowerCase());
        })
        .map((currentMovie) => {
          return (
            <div className="d-flex justify-content-center mb-3">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
                  className="card-img-top"
                  alt="movie poster"
                />
                <div className="card-body">
                  <h5 className="card-title">{currentMovie.original_title}</h5>
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
    </>
  );
}
