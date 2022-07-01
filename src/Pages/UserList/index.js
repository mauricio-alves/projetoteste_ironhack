import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function UserList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchList() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/mauricio-filmes/${id}`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    }
    fetchList();
  }, [id]);

  async function handleDelete() {
    try {
      await axios.delete(
        `https://ironrest.herokuapp.com/mauricio-filmes/${id}`
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return loading ? (
    <div className="spinner-border text-info" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <div>
      <div className="mb-3">
        <h1 className="d-flex justify-content-center">
          Lista de: {movie.name}
        </h1>
        <h2 className="d-flex justify-content-center">
          Título da lista: {movie.title}
        </h2>
        <div className="d-flex justify-content-center mt-3">
          <Link to={`/edit-list/${id}`} className="btn btn-success mb-3">
            Editar lista
          </Link>
          <button onClick={handleDelete} className="btn btn-danger mb-3  ms-3">
            Deletar lista
          </button>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {movie.movies.map((currentMovie) => {
          return (
            <div key={currentMovie.id}>
              <div className="card m-1" style={{ width: "18rem" }}>
                <img
                  src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
                  className="card-img-top"
                  alt="movie poster"
                />
                <div className="card-body">
                  <h5 className="card-title">{currentMovie.title}</h5>
                  <p className="card-text">
                    <b>Nota: {currentMovie.vote_average}</b>
                  </p>
                  <p className="card-text">{currentMovie.overview}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
