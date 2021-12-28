import { useEffect, useLayoutEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { POKE_API_URL } from "../constants";

import useRequest from "../hooks/useRequest";
import useStateChangedRef from "../hooks/useStateChangedRef";

import { usePokeCtx } from "../context/PokeCtx";

import PokeImage from "../components/PokeImage";
import PokeAbility from "../components/PokeAbility";
import PokeStats from "../components/PokeStats";
import PokeType from "../components/PokeType";
import PokeEvolution from "../components/PokeEvolution";
import PokeLoader from "../components/PokeLoader";
import { DEFAULT_STATS } from "../constants/stats";

function PokeDetails() {
  const { pokeName } = useParams();
  const { loading: ctxLoading, pokemons } = usePokeCtx();

  const isValid = pokemons.findIndex(({ name }) => name === pokeName) !== -1;
  const isPageChangedRef = useStateChangedRef(pokeName);

  const { loading, data, request, resetState } = useRequest({
    baseURL: POKE_API_URL,
    initialLoading: true,
    initialData: {
      abilities: [],
      base_experience: 0,
      height: 0,
      sprites: {
        front_default: "",
        front_shiny: ""
      },
      stats: DEFAULT_STATS,
      types: [],
      weight: 0
    }
  });

  useLayoutEffect(() => {
    // Reset the placeholders when pokeName changes
    resetState();
    window.scroll({ top: 0 });
  }, [resetState, pokeName]);

  useEffect(() => {
    if (!isValid) return;
    const aborter = new AbortController();
    request({
      endpoint: `pokemon/${pokeName}`,
      signal: aborter.signal,
      dataTransformer: (data) => ({
        ...data,
        types: data.types?.map(({ type: { name } }) => name),
        abilities: data.abilities?.map(({ ability: { name } }) => name),
        stats: data.stats?.map(({ stat: { name }, base_stat }) => ({
          name,
          base: base_stat
        }))
      })
    });

    return () => aborter.abort();
  }, [request, isValid, pokeName]);

  const isLoading = loading || isPageChangedRef.current;
  if (ctxLoading) return <PokeLoader fullSize />;
  if (!isValid) return <Navigate replace to="/not-found" />;
  return (
    <article className="container pb-3">
      <header>
        <div className="d-flex justify-content-center">
          <PokeImage
            width={120}
            height={120}
            loading={isLoading}
            src={data.sprites.front_default}
            srcAlternative={data.sprites.front_shiny}
            alt={pokeName}
          />
        </div>
        <h2 className="text-center text-capitalize">{pokeName}</h2>
      </header>
      <section className="row">
        <div className="col text-end">
          <dl>
            <dt>Height</dt>
            <dd>{data.height}"</dd>
            <dt>Types</dt>
            {data.types.map((type) => (
              <dd key={type} className="mb-0">
                <PokeType type={type} />
              </dd>
            ))}
          </dl>
        </div>
        <div className="col">
          <dl>
            <dt>Weight</dt>
            <dd>{data.weight} lbs</dd>
            <dt>Abilities</dt>
            {data.abilities.map((ability) => (
              <dd key={ability} className="mb-0">
                <PokeAbility ability={ability} />
              </dd>
            ))}
          </dl>
        </div>
      </section>

      <section className="text-center row justify-content-center">
        <h2>Statistics</h2>
        <div className="col-12">
          <p>
            <b>Base Experience: </b>
            {data.base_experience}
          </p>
        </div>
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <PokeStats type={data.types[0]} stats={data.stats} />
        </div>
      </section>

      <section>
        <h2 className="text-center text-capitalize">Evolution</h2>
        <PokeEvolution />
      </section>
    </article>
  );
}

export default PokeDetails;
