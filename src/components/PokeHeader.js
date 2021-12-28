import { Link, useLocation, useParams } from "react-router-dom";
import { PAGE_HOME_URL } from "../constants";
import { usePokeCtx } from "../context/PokeCtx";

const link_classname =
  "d-inline-block text-capitalize text-decoration-none text-white p-3";

function PokeHeader() {
  const { pokeName } = useParams();
  const { pokemons } = usePokeCtx();

  const currentIndex = pokemons.findIndex(({ name }) => name === pokeName);
  let prevPoke, nextPoke;
  if (currentIndex > -1) {
    prevPoke = pokemons[currentIndex - 1]?.name;
    nextPoke = pokemons[currentIndex + 1]?.name;
  }

  return (
    <header
      className={`shadow p-1 mb-3 bg-danger position-sticky top-0 z-1 flex-center`}
    >
      {pokeName && (
        <nav className="position-absolute bottom-0 w-100 d-flex justify-content-between">
          <div>
            {prevPoke && (
              <Link className={link_classname} to={`/${prevPoke}`}>
                {"<  "}
                {prevPoke}
              </Link>
            )}
          </div>

          <div>
            {nextPoke && (
              <Link className={link_classname} to={`/${nextPoke}`}>
                {nextPoke}
                {"  >"}
              </Link>
            )}
          </div>
        </nav>
      )}

      <Link
        className={`${link_classname} position-relative`}
        to="/"
        state={{ from: pokeName }}
        onClick={() => !pokeName && window.scrollTo({ top: 0 })}
      >
        <h1 className="m-0">POKEDEX</h1>
      </Link>
    </header>
  );
}

export default PokeHeader;
