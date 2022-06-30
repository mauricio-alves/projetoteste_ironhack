import { useState } from "react";
import { Search } from "../../components/Search";
import axios from "axios";

export function CreateMoviesList({ movies, setMovies }) {
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    title: "",
    movies: [],
  });
  const [addMovie, setAddMovie] = useState({
    original_title: "",
    overview: "",
  });
  console.log(form);

  function handleChange(event) {
    setForm({ event });
  }

  function handleMovie(event) {
    setAddMovie({ ...addMovie, event });
    console.log(event);
    console.log(addMovie);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post("https://ironrest.herokuapp.com/mauricio-filmes", form);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
        {/* <Link to={`/movies/user-list/`}> */}
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Criar lista
        </button>
        {/* </Link> */}
      </form>

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
                <img src="..." className="card-img-top" alt="movie poster" />
                <div className="card-body">
                  <h5 className="card-title">{currentMovie.original_title}</h5>
                  <p className="card-text">{currentMovie.overview}</p>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => {
                      handleMovie(currentMovie);
                    }}
                  >
                    Adicionar a sua lista!
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
