import pokeball from "../assets/pokeball.png";

function PokeLoader({ fullSize }) {
  return (
    <div className={`${fullSize ? "full-size" : ""} flex-center`}>
      <div
        className="spinner-border text-light flex-center"
        style={{ width: 120, height: 120 }}
        role="status"
      >
        <img
          className="img-fluid d-block"
          src={pokeball}
          alt="loading spinner"
        />
      </div>
    </div>
  );
}

export default PokeLoader;
