import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import type { Pokemon } from '@/types';
import { PokemonCard } from '@/components/PokemonCard';
import { SkeletonCard } from '@/components/SkeletonCard';
import { Search } from 'lucide-react';

interface ApiPokemon {
  name: string;
  url: string;
}

const Home = () => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=2000');
        
        const mappedPokemon: Pokemon[] = response.data.results.map((p: ApiPokemon) => {
          const idStr = p.url.split('/').filter(Boolean).pop();
          const id = idStr ? parseInt(idStr, 10) : 0;
          return {
            id,
            name: p.name,
            url: p.url,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          };
        }).filter((p: Pokemon) => p.id < 10000);
        
        setAllPokemon(mappedPokemon);
      } catch (error) {
        console.error("Error fetching pokemon", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  const filteredPokemon = useMemo(() => {
    if (!searchTerm) return allPokemon;
    return allPokemon.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [allPokemon, searchTerm]);

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  
  const currentPokemon = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPokemon.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPokemon, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h1 className="text-4xl font-black text-black relative inline-block">
          Explore Pokemon
          <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#ccff00] -z-10 rounded-full border-[2px] border-black"></span>
        </h1>
        
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={22} className="text-black" strokeWidth={3} />
          </div>
          <input
            type="text"
            placeholder="Search Pokemon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 bg-white text-black placeholder-gray-400 focus:outline-none border-[3px] border-black shadow-[4px_4px_0_0_#000] rounded-2xl font-bold text-lg focus:-translate-y-1 focus:shadow-[6px_6px_0_0_#000] transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          {filteredPokemon.length === 0 ? (
            <div className="text-center py-12 bg-white border-[3px] border-black shadow-[6px_6px_0_0_#000] rounded-3xl max-w-lg mx-auto">
              <p className="text-xl font-black text-black">No Pokemon found matching "{searchTerm}"</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {currentPokemon.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-6">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-6 py-3 rounded-2xl bg-white text-black border-[3px] border-black shadow-[4px_4px_0_0_#000] font-black uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-1 active:shadow-none transition-all"
                  >
                    Prev
                  </button>
                  <div className="text-lg font-black text-black bg-[#ccff00] px-6 py-2 rounded-2xl border-[3px] border-black shadow-[4px_4px_0_0_#000]">
                    {currentPage} / {totalPages}
                  </div>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-6 py-3 rounded-2xl bg-white text-black border-[3px] border-black shadow-[4px_4px_0_0_#000] font-black uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-1 active:shadow-none transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
