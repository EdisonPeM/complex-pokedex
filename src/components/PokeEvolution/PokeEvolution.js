import { memo, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { POKE_API_URL } from "../../constants";

import useRequest from "../../hooks/useRequest";
import PokeLoader from "../PokeLoader";
import PokeEvolutionTree from "./PokeEvolutionTree";

function PokeEvolution() {
  const { pokeName } = useParams();
  const {
    loading: specieLoading,
    data: specieData,
    request: specieRequest
  } = useRequest({
    baseURL: POKE_API_URL,
    initialLoading: true
  });

  const {
    loading: evolutionLoading,
    data: evolutionData,
    request: evolutionRequest,
    resetState
  } = useRequest({
    initialLoading: true,
    initialData: {
      chain: {
        species: null
      }
    }
  });

  useLayoutEffect(() => {
    // Reset the placeholders when pokeName changes
    resetState();
  }, [resetState, pokeName]);

  useEffect(() => {
    const aborter = new AbortController();
    specieRequest({
      endpoint: `pokemon-species/${pokeName}`,
      signal: aborter.signal
    });
    return () => aborter.abort();
  }, [specieRequest, pokeName]);

  useEffect(() => {
    if (!specieData) return;

    const { evolution_chain } = specieData;
    const aborter = new AbortController();
    evolutionRequest({
      url: evolution_chain?.url,
      signal: aborter.signal
    });
    return () => aborter.abort();
  }, [evolutionRequest, specieData]);

  if (specieLoading || evolutionLoading) {
    return <PokeLoader />;
  }

  return (
    <div>
      <PokeEvolutionTree chain={evolutionData.chain} />
    </div>
  );
}

export default memo(PokeEvolution);
