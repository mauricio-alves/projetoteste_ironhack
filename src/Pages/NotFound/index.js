import notFoundImg from "../../assets/images/404-page.png";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div>
      <Link
        to="/"
        className="btn btn-primary mb-3"
        style={{ marginLeft: "500px" }}
      >
        Voltar para início
      </Link>
      <img src={notFoundImg} style={{ width: "75rem" }} alt="not found page" />
    </div>
  );
}
