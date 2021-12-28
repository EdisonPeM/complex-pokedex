import { UNONWS } from "../constants/unknows";

function PokeUnown({ character = "a", ...otherProps }) {
  const unownImg = UNONWS[character];
  return <img {...otherProps} src={unownImg} alt={character} />;
}

export default PokeUnown;
