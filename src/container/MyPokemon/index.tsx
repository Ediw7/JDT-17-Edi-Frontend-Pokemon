import { useState } from 'react';
import { usePokemon } from '@/hooks/usePokemon';
import { PokemonCard } from '@/components/PokemonCard';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const MyPokemon = () => {
  const { myPokemon, releasePokemon } = usePokemon();
  const [pokemonToRelease, setPokemonToRelease] = useState<string | null>(null);

  const confirmRelease = () => {
    if (pokemonToRelease) {
      releasePokemon(pokemonToRelease);
      setPokemonToRelease(null);
    }
  };

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h1 className="text-4xl font-black text-black relative inline-block">
          My Pokemon
          <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#ff7675] -z-10 rounded-full border-[2px] border-black"></span>
        </h1>
        <div className="bg-[#ccff00] text-black px-6 py-3 rounded-2xl font-black border-[3px] border-black shadow-[4px_4px_0_0_#000]">
          Total Caught: {myPokemon.length}
        </div>
      </div>

      {myPokemon.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-[3px] border-black shadow-[8px_8px_0_0_#000]">
          <img 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
            alt="Empty Pokeball" 
            className="w-32 h-32 mx-auto mb-6 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] hover:scale-110 hover:-rotate-12 transition-all"
          />
          <h2 className="text-3xl font-black text-black mb-4">No Pokemon Caught Yet!</h2>
          <p className="text-gray-700 font-bold mb-8 max-w-md mx-auto text-lg">
            You haven't caught any Pokemon. Go to the Home page and explore the wild to catch some!
          </p>
          <Link 
            to="/"
            className="inline-flex items-center px-8 py-4 text-lg font-black rounded-2xl text-black bg-[#ccff00] border-[3px] border-black shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-1 active:shadow-none transition-all uppercase tracking-wider"
          >
            Explore Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {myPokemon.map((pokemon) => (
            <div key={pokemon.nickname} className="relative group">
              <PokemonCard 
                pokemon={pokemon} 
              />
              <div className="absolute -top-3 -right-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPokemonToRelease(pokemon.nickname);
                  }}
                  className="p-3 bg-[#ff7675] text-black rounded-full border-[3px] border-black shadow-[3px_3px_0_0_#000] hover:-translate-y-1 hover:shadow-[5px_5px_0_0_#000] active:translate-y-1 active:shadow-none transition-all"
                  aria-label="Release Pokemon"
                >
                  <Trash2 size={20} strokeWidth={3} />
                </button>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-center z-10 w-4/5">
                <span className="block bg-white text-black text-sm px-4 py-2 rounded-xl font-black border-[3px] border-black shadow-[2px_2px_0_0_#000] truncate">
                  {pokemon.nickname}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {pokemonToRelease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl border-[4px] border-black shadow-[8px_8px_0_0_#000] max-w-sm w-full relative">
            <h3 className="text-2xl font-black text-black mb-4">Release Pokemon?</h3>
            <p className="font-bold text-gray-700 mb-8">
              Are you sure you want to release <span className="text-black bg-[#ff7675] px-2 py-0.5 border-[2px] border-black rounded-md">{pokemonToRelease}</span> back into the wild? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setPokemonToRelease(null)}
                className="flex-1 py-3 bg-white text-black font-black border-[3px] border-black shadow-[4px_4px_0_0_#000] rounded-xl hover:-translate-y-1 transition-all active:translate-y-1 active:shadow-none"
              >
                Cancel
              </button>
              <button
                onClick={confirmRelease}
                className="flex-1 py-3 bg-[#ff7675] text-black font-black border-[3px] border-black shadow-[4px_4px_0_0_#000] rounded-xl hover:-translate-y-1 transition-all active:translate-y-1 active:shadow-none"
              >
                Release
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPokemon;
