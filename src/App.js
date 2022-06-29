import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";

export function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
