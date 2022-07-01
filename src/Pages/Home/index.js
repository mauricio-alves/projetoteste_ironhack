import moviesListBackground from "../../assets/images/movieslist_background.jpg";
import { Link } from "react-router-dom";

export function Home({ moviesDB, setMoviesDB }) {
  return (
    <div className='main'>
      <div className="mb-3">
        <div className='d-flex justify-content-center'>
          <Link to="/movies">
            <button className="btn btn-primary mb-3">Crie sua lista</button>
          </Link>
        </div>
        <div className="d-flex flex-wrap ">
          {moviesDB.map((currentList) => {
            return (
              <div key={currentList._id}>
                <div className="card m-1" style={{ width: "18rem" }}>
                  <img
                    src={moviesListBackground}
                    className="card-img-top"
                    alt="movie poster"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Lista de: {currentList.name}</h5>
                    <p className="card-title">Título: {currentList.title}</p>
                    <Link to={`/user-list/${currentList._id}`}>
                      <button type="submit" className="btn btn-info">
                        Detalhes
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
