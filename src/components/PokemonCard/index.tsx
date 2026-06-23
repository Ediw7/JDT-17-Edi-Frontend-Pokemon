import { Link } from 'react-router-dom';
import type { Pokemon } from '@/types';
import bgPokemon from '@/assets/bgPokemon.webp';

interface PokemonCardProps {
  pokemon: Pokemon;
  actionButton?: React.ReactNode;
}

export const PokemonCard = ({ pokemon, actionButton }: PokemonCardProps) => {
  return (
    <div className="bg-white rounded-3xl border-[3px] border-black shadow-[4px_4px_0_0_#000] overflow-hidden relative transition-transform hover:-translate-y-1">
      <Link 
        to={`/pokemon/${pokemon.id}`} 
        className="block relative pt-[100%] border-b-[3px] border-black bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgPokemon})` }}
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`}
          alt={pokemon.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = pokemon.image;
          }}
          className="absolute inset-0 w-full h-full object-contain p-6 scale-125"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full border-[2px] border-black text-xs font-black shadow-[2px_2px_0_0_#000]">
          #{pokemon.id.toString().padStart(3, '0')}
        </div>
      </Link>
      <div className="p-4 text-center">
        <h3 className="text-xl font-black text-black capitalize mb-2">
          {pokemon.name}
        </h3>
        {actionButton && <div className="mt-2">{actionButton}</div>}
      </div>
    </div>
  );
};
