import PokeUnown from "../components/PokeUnown";
import pokeball from "../assets/pokeball.png";

const MESSAGE = "PAGE NOT FOUND";
function PokeNotFound() {
  return (
    <div
      className="container position-relative flex-center flex-column h-100 pb-5"
      style={{ maxWidth: "540px" }}
    >
      <img
        className="img-fluid opacity-25 position-absolute"
        src={pokeball}
        alt="background"
      />
      {MESSAGE.split(" ").map((line, i) => (
        <div key={i} className="position-relative my-2 w-100 text-center">
          {line.split("").map((char, j) => (
            <PokeUnown key={j} character={char} style={{ width: "20%" }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default PokeNotFound;
