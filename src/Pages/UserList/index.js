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
    <h1>Carregando...</h1>
  ) : (
    <div>
      <h1>{movie.name}</h1>
      <h2>{movie.title}</h2>
      <button onClick={handleDelete} className="btn btn-danger mb-3">
        Deletar lista
      </button>
      <Link to={`/edit-list/${id}`} className="btn btn-success mb-3 ms-2">
        Editar lista
      </Link>
      {movie.movies.map((currentMovie) => {
        return (
          <div>
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
            </div>
          </div>
        );
      })}
    </div>
  );
}
