import { useEffect, useMemo, useState } from "react";
import { POKE_API_URL, typesLabelImgs } from "../constants";
import useRequest from "../hooks/useRequest";
import PokePopup from "./PokePopup";

function PokeType({ type }) {
  const [imgLoaded, setLoaded] = useState(false);
  const typeImage = typesLabelImgs[type];

  const { loading, data, request } = useRequest({
    baseURL: POKE_API_URL,
    initialLoading: true,
    initialData: { damages_from: null, damages_to: null }
  });

  useEffect(() => {
    const aborter = new AbortController();
    request({
      endpoint: `type/${type}`,
      signal: aborter.signal,
      dataTransformer: (data) => ({
        damages_from: {
          double: data?.damage_relations?.double_damage_from,
          half: data?.damage_relations?.half_damage_from,
          none: data?.damage_relations?.no_damage_from
        },
        damages_to: {
          double: data?.damage_relations?.double_damage_to,
          half: data?.damage_relations?.half_damage_to,
          none: data?.damage_relations?.no_damage_to
        }
      })
    });

    return () => aborter.abort();
  }, [request, type]);

  const content = useMemo(() => {
    const renderEntries = (arr) => (arr && arr.length > 0 ? arr : "-");
    const mapType = ({ name }) => (
      <img
        className="d-block mb-1"
        key={name}
        src={typesLabelImgs[name]}
        alt={`${name} label`}
      />
    );

    return (
      <table className="table table-hover mb-0 text-center">
        <caption>Damage Relations</caption>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Fom</th>
            <th scope="col">To</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1/2</th>
            <td>{renderEntries(data?.damages_from?.half.map(mapType))}</td>
            <td>{renderEntries(data?.damages_to?.half.map(mapType))}</td>
          </tr>
          <tr>
            <th scope="row">0</th>
            <td>{renderEntries(data?.damages_from?.none.map(mapType))}</td>
            <td>{renderEntries(data?.damages_to?.none.map(mapType))}</td>
          </tr>
          <tr>
            <th scope="row">x2</th>
            <td>{renderEntries(data?.damages_from?.double.map(mapType))}</td>
            <td>{renderEntries(data?.damages_to?.double.map(mapType))}</td>
          </tr>
        </tbody>
      </table>
    );
  }, [data]);

  return (
    <div>
      <PokePopup content={content}>
        {!imgLoaded && <span className="d-inline-block py-1 px-2">{type}</span>}
        <img src={typeImage} alt={type} onLoad={() => setLoaded(true)} />
      </PokePopup>
    </div>
  );
}

export default PokeType;
