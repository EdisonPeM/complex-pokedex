import { usePokeCtx } from "../context/PokeCtx";

import PokeCard from "../components/PokeCard";
import { useLocation } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";
import { POKE_NAME_PLACEHOLER } from "../constants";
import PokeLoader from "../components/PokeLoader";

function PokeList() {
  const { pokemons, loading, loadMore } = usePokeCtx();
  const { state: locationState } = useLocation();

  const prevPkmnRef = useRef(null);
  const assingRef = (name) => (node) => {
    if (locationState?.from === name) {
      prevPkmnRef.current = node;
    }
  };

  useLayoutEffect(() => {
    const prevPkmnNode = prevPkmnRef.current;
    if (!prevPkmnNode) return;
    window.scroll({ top: prevPkmnNode.offsetTop });
  }, [locationState]);

  return (
    <div className="container">
      <div className="row">
        {pokemons.map(({ name, id, sprites }, index) => (
          <div
            ref={assingRef(name)}
            key={id || index}
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
          >
            <PokeCard
              loading={name === POKE_NAME_PLACEHOLER}
              name={name}
              sprites={sprites}
            />
          </div>
        ))}

        {pokemons.length > 12 && (
          <>
            {loading && <PokeLoader />}
            <button
              disabled={loading}
              onClick={loadMore}
              className="btn btn-lg btn-secondary mb-4"
            >
              Load More
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PokeList;
