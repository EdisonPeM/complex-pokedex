import { memo } from "react";
import { Link } from "react-router-dom";
import { POKE_NAME_PLACEHOLER } from "../constants";

import PokeImage from "./PokeImage";

function PokeCard({ className = "", loading, name, sprites }) {
  return (
    <div className={`card shadow text-center ${className}`}>
      <div className="card-body">
        <Link
          className="text-decoration-none text-black"
          to={name !== POKE_NAME_PLACEHOLER ? `/${name}` : ""}
        >
          <h2 className="h4 text-capitalize">{name}</h2>
          <div className="d-flex justify-content-center cursor-pointer">
            <PokeImage
              loading={loading}
              src={sprites?.front_default}
              srcAlternative={sprites?.front_shiny}
              alt={name}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default memo(PokeCard);
