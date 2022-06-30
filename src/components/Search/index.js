export function Search({ search, setSearch }) {
  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <>
      <div
        style={{ maxWidth: "700px", marginLeft: "250px", marginBottom: "20px" }}
      >
        <label htmlFor="input-search">Procurar filme: </label>
        <br />
        <input
          id="input-search"
          name="name"
          value={search}
          type="text"
          onChange={handleChange}
          className="form-control"
        />
      </div>
    </>
  );
}
