import PokeEvolutionNode from "./PokeEvolutionNode";

function PokeEvolutionTree({ chain }) {
  return (
    <div className="flex-center">
      <PokeEvolutionNode specie={chain?.species} />
      <div className="flex-center flex-column">
        {chain.evolves_to?.map((nextChain, indx) => (
          <PokeEvolutionTree key={indx} chain={nextChain} />
        ))}
      </div>
    </div>
  );
}

export default PokeEvolutionTree;
