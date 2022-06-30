import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <Link to="/movies">
        <button className="btn btn-primary">Crie sua lista!</button>
      </Link>
      <div>
        <p>Listas criadas</p>
      </div>
    </div>
  );
}
