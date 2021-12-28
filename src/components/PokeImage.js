import { useState } from "react";
import pokeball from "../assets/pokeball.png";

const defaultPokeBallImage = pokeball;
function PokeImage({
  defaultImage = defaultPokeBallImage,
  className = "",
  loading,
  src,
  alt,
  srcAlternative,
  width = 96,
  height = 96
}) {
  const [loaded, setLoaded] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const handleHover = (hover) => () => {
    if (!srcAlternative) return;
    setHovered(hover);
  };

  return (
    <div
      className={`position-relative ${className}`}
      onMouseEnter={handleHover(true)}
      onMouseLeave={handleHover(false)}
      onTouchStart={handleHover(!isHovered)}
    >
      {(loading || !loaded) && (
        <img
          className="animated"
          src={defaultImage}
          alt={`${alt} placeholder`}
          style={{ width, height }}
          width={width}
          height={height}
        />
      )}

      {src && !loading && (
        <img
          loading="lazy"
          className={`${!loaded ? "position-absolute top-0" : ""} ${
            isHovered ? "d-none" : "d-block"
          }`}
          src={src}
          alt={alt}
          style={{ width, height }}
          width={width}
          height={height}
          onLoad={() => setLoaded(true)}
        />
      )}

      {srcAlternative && !loading && loaded && (
        <img
          className={isHovered ? "d-block" : "d-none"}
          src={srcAlternative}
          alt={alt}
          width={width}
          height={height}
        />
      )}
    </div>
  );
}

export default PokeImage;
