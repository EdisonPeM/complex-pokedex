import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import {
  DEFAULT_DELAY,
  POKEDEX,
  POKE_API_URL,
  POKE_LIST_PLACEHOLER_RESULTS
} from "../constants";

import useRequest from "../hooks/useRequest";
import { getFrontImage, getIdFromUrl, getShinyImage } from "../utils";

const initialLoading = true;
const initialData = POKE_LIST_PLACEHOLER_RESULTS;

const pokeCtx = createContext({
  loading: initialLoading,
  pokemons: initialData
});

export const usePokeCtx = () => useContext(pokeCtx);

const mapResults = ({ name, url }) => {
  const id = getIdFromUrl(url);
  const front_default = getFrontImage(id);
  const front_shiny = getShinyImage(id);
  return {
    id,
    name,
    sprites: {
      front_default,
      front_shiny
    },
    url
  };
};
export const PokeCtxProvider = ({ children }) => {
  const [gen, setGen] = useState(1);
  const { loading, data, request } = useRequest({
    baseURL: POKE_API_URL,
    initialData,
    initialLoading
  });

  useEffect(() => {
    request({
      endpoint: "pokemon?limit=151",
      delay: DEFAULT_DELAY,
      dataTransformer: (data) => data.results.map(mapResults)
    });
  }, [request]);

  const loadMore = useCallback(() => {
    setGen((prevGen) => {
      const nextGen = prevGen + 1;
      const pokedexGen = POKEDEX.find(({ gen }) => gen === nextGen);
      if (!pokedexGen) return prevGen;

      const { from, to } = pokedexGen;
      request({
        endpoint: `pokemon?limit=${to - from + 1}&offset=${from - 1}`,
        dataTransformer: (nextData) =>
          data.concat(nextData.results.map(mapResults))
      });

      return nextGen;
    });
  }, [request, data]);

  return (
    <pokeCtx.Provider value={{ loading, pokemons: data, gen, loadMore }}>
      {children}
    </pokeCtx.Provider>
  );
};
