import { useEffect } from "react";
import { usePokeCtx } from "../../context/PokeCtx";
import useRequest from "../../hooks/useRequest";
import { getFrontImage, getIdFromUrl, getShinyImage } from "../../utils";
import PokeCard from "../PokeCard";

function PokeEvolutionNode({ specie }) {
  const { loading: loadingCtx, pokemons } = usePokeCtx();
  const exist = pokemons.findIndex(({ name }) => name === specie.name) !== -1;
  const { loading, data, request } = useRequest({
    initialLoading: true,
    initialData: {
      name: specie?.name,
      sprites: { front_default: "", front_shiny: "" }
    }
  });

  useEffect(() => {
    if (!exist || !specie?.url) return;

    const aborter = new AbortController();
    request({
      url: specie?.url,
      signal: aborter.signal,
      dataTransformer: (data) => {
        const defaultVariety = data.varieties.find(
          ({ is_default }) => is_default
        );
        const { pokemon } = defaultVariety;

        const id = getIdFromUrl(pokemon.url);
        const front_default = getFrontImage(id);
        const front_shiny = getShinyImage(id);
        return {
          ...pokemon,
          id,
          sprites: {
            front_default,
            front_shiny
          }
        };
      }
    });
    return () => aborter.abort();
  }, [request, exist, specie.url]);

  return exist ? (
    <PokeCard
      className="m-2"
      loading={loadingCtx || loading}
      name={data.name}
      sprites={data.sprites}
    />
  ) : null;
}

export default PokeEvolutionNode;
