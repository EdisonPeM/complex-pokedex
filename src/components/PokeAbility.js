// eslint-disable jsx-a11y/anchor-is-valid
import { memo, useEffect } from "react";
import useRequest from "../hooks/useRequest";
import { POKE_API_URL } from "../constants";
import PokePopup from "./PokePopup";

function PokeAbility({ ability }) {
  const { data, request } = useRequest({
    baseURL: POKE_API_URL,
    initialData: { effect: "" }
  });

  useEffect(() => {
    const aborter = new AbortController();
    request({
      endpoint: `ability/${ability}`,
      signal: aborter.signal,
      dataTransformer: (data) => {
        const englishEntry = data?.effect_entries?.find(
          ({ language }) => language.name === "en"
        );

        return {
          effect: englishEntry?.effect || ""
        };
      }
    });

    return () => aborter.abort();
  }, [request, ability]);

  return (
    <div>
      <PokePopup title={ability} content={data.effect}>
        {ability}
      </PokePopup>
    </div>
  );
}

export default memo(PokeAbility);
