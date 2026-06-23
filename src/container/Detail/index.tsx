import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { PokemonDetail as PokemonDetailType } from '@/types';
import { usePokemon } from '@/hooks/usePokemon';
import { ArrowLeft } from 'lucide-react';
import bgPokemon from '@/assets/bgPokemon.webp';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { catchPokemon, checkNicknameExists } = usePokemon();
  
  const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [catchStatus, setCatchStatus] = useState<'idle' | 'catching' | 'success' | 'failed'>('idle');
  const [nickname, setNickname] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('About');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);
      } catch (error) {
        console.error("Error fetching detail", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  const handleCatch = () => {
    setCatchStatus('catching');
    setTimeout(() => {
      const isCaught = Math.random() < 0.7;
      setCatchStatus(isCaught ? 'success' : 'failed');
    }, 1500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setErrorMsg('Nickname cannot be empty');
      return;
    }
    
    if (checkNicknameExists(nickname.trim())) {
      setErrorMsg('Nickname already exists! Choose another one.');
      return;
    }

    if (pokemon) {
      const p = {
        id: pokemon.id,
        name: pokemon.name,
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
        image: pokemon.sprites.other['showdown']?.front_default || pokemon.sprites.other['official-artwork'].front_default
      };
      const saved = catchPokemon(p, nickname.trim());
      if (saved) {
        navigate('/my-pokemon');
      }
    }
  };

  const resetCatch = () => {
    setCatchStatus('idle');
    setNickname('');
    setErrorMsg('');
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 animate-pulse">
        <div className="h-10 bg-gray-200 rounded-xl w-32 mb-6 border-[3px] border-black"></div>
        <div className="bg-white rounded-[40px] border-[4px] border-black h-[600px] shadow-[8px_8px_0_0_#000]">
          <div className="bg-gray-200 h-72 border-b-[4px] border-black"></div>
          <div className="p-8">
            <div className="h-16 bg-gray-200 rounded-2xl w-full mb-8 border-[3px] border-black"></div>
            <div className="flex justify-center gap-3 mb-6">
              <div className="h-10 bg-gray-200 rounded-full w-24 border-[3px] border-black"></div>
              <div className="h-10 bg-gray-200 rounded-full w-24 border-[3px] border-black"></div>
            </div>
            <div className="h-40 bg-gray-200 rounded-3xl w-full border-[3px] border-black"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border-[3px] border-black shadow-[8px_8px_0_0_#000] max-w-lg mx-auto mt-10">
        <h2 className="text-3xl font-black text-black mb-4">Pokemon not found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 bg-[#ccff00] text-black font-black px-6 py-3 rounded-2xl border-[3px] border-black shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-1 active:shadow-none transition-all">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-black font-black hover:-translate-y-1 transition-transform bg-white px-4 py-2 rounded-xl border-[3px] border-black shadow-[3px_3px_0_0_#000] active:translate-y-1 active:shadow-none"
        >
          <ArrowLeft size={20} className="mr-2" strokeWidth={3} />
          Back
        </button>
        <h1 className="text-3xl font-black text-black capitalize">{pokemon.name}</h1>
      </div>

      <div className="bg-white rounded-[40px] border-[4px] border-black shadow-[8px_8px_0_0_#000] overflow-hidden mb-8">
        
        <div 
          className="h-72 border-b-[4px] border-black relative flex items-center justify-center p-8 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgPokemon})` }}
        >
          <div className="absolute top-4 right-4 bg-white px-4 py-1.5 rounded-full border-[3px] border-black text-lg font-black shadow-[3px_3px_0_0_#000]">
            #{pokemon.id.toString().padStart(3, '0')}
          </div>

          <img 
            src={pokemon.sprites.other['showdown']?.front_default || pokemon.sprites.other['official-artwork'].front_default} 
            alt={pokemon.name}
            className="w-48 h-48 object-contain relative z-10 scale-125 drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)]"
          />
        </div>

        <div className="p-8 pb-4 border-b-[4px] border-black bg-[#fff8e1]">
            <div className="w-full">
              {catchStatus === 'idle' && (
                <div className="flex flex-col items-center">
                  <p className="text-lg font-black text-center mb-4">Know everything about Pokemon and Enjoy!</p>
                  <button
                    onClick={handleCatch}
                    className="w-full py-4 bg-[#ccff00] text-black border-[4px] border-black font-black rounded-2xl shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] transition-all flex items-center justify-center gap-2 text-xl active:translate-y-1 active:shadow-none"
                  >
                    Get Started! (Catch)
                  </button>
                </div>
              )}

              {catchStatus === 'catching' && (
                <div className="w-full py-4 bg-white text-black font-black border-[4px] border-black rounded-2xl flex items-center justify-center gap-3 text-xl shadow-[4px_4px_0_0_#000]">
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="catching" className="w-8 h-8 animate-spin" />
                  Catching...
                </div>
              )}

              {catchStatus === 'failed' && (
                <div className="text-center animate-pulse bg-white p-6 rounded-2xl border-[4px] border-black shadow-[4px_4px_0_0_#000]">
                  <p className="text-red-500 font-black text-xl mb-4">Oh no! The Pokemon broke free!</p>
                  <button
                    onClick={resetCatch}
                    className="px-8 py-3 bg-[#ff7675] text-black font-black border-[3px] border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {catchStatus === 'success' && (
                <div className="bg-[#ccff00] p-6 rounded-2xl border-[4px] border-black shadow-[4px_4px_0_0_#000]">
                  <p className="text-black font-black text-xl mb-4 text-center">
                    Gotcha! {pokemon.name} was caught!
                  </p>
                  <form onSubmit={handleSave} className="space-y-4">
                    <div>
                      <label htmlFor="nickname" className="block text-sm font-black text-black mb-2">
                        Give it a nickname
                      </label>
                      <input
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={(e) => {
                          setNickname(e.target.value);
                          setErrorMsg('');
                        }}
                        className="w-full px-4 py-3 bg-white text-black focus:outline-none border-[3px] border-black rounded-xl font-bold shadow-[inset_2px_2px_0_rgba(0,0,0,0.1)]"
                        placeholder="e.g. Sparky"
                        autoFocus
                      />
                      {errorMsg && <p className="text-red-600 text-sm mt-2 font-bold">{errorMsg}</p>}
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={resetCatch}
                        className="flex-1 py-3 bg-white text-black font-black border-[3px] border-black shadow-[4px_4px_0_0_#000] rounded-xl active:translate-y-1 active:shadow-none hover:-translate-y-1 transition-all"
                      >
                        Release
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-black text-white font-black border-[3px] border-black shadow-[4px_4px_0_0_#000] rounded-xl active:translate-y-1 active:shadow-none hover:-translate-y-1 transition-all"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
        </div>

        <div className="p-8 bg-white">
          <div className="flex justify-center mb-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {pokemon.types.map((t) => (
                <span key={t.type.name} className="px-6 py-2 bg-[#b5d5ff] text-black rounded-full text-base capitalize font-black border-[3px] border-black shadow-[2px_2px_0_0_#000]">
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button className={`px-4 py-2 font-black text-sm uppercase rounded-xl border-[3px] transition-all ${activeTab === 'About' ? 'bg-[#ccff00] border-black shadow-[3px_3px_0_0_#000]' : 'border-transparent text-gray-500 hover:text-black'}`} onClick={() => setActiveTab('About')}>About</button>
            <button className={`px-4 py-2 font-black text-sm uppercase rounded-xl border-[3px] transition-all ${activeTab === 'Stats' ? 'bg-[#ccff00] border-black shadow-[3px_3px_0_0_#000]' : 'border-transparent text-gray-500 hover:text-black'}`} onClick={() => setActiveTab('Stats')}>Stats</button>
          </div>

          <div className="bg-white border-[4px] border-black rounded-3xl p-6 shadow-[6px_6px_0_0_#000]">
            {activeTab === 'About' && (
              <div>
                <p className="font-bold text-gray-700 leading-relaxed mb-6">
                  {pokemon.name} is a {pokemon.types.map(t => t.type.name).join(' / ')} type Pokemon introduced in Generation 1. Known for its distinct characteristics and abilities.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Weight</h3>
                    <div className="bg-[#ccff00] border-[3px] border-black rounded-xl py-2 shadow-[2px_2px_0_0_#000] font-black text-lg">
                      {pokemon.weight / 10} kg
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Height</h3>
                    <div className="bg-[#ccff00] border-[3px] border-black rounded-xl py-2 shadow-[2px_2px_0_0_#000] font-black text-lg">
                      {pokemon.height / 10} m
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Stats' && (
              <div className="space-y-5">
                {pokemon.stats.map((s) => (
                  <div key={s.stat.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="capitalize text-black font-black">{s.stat.name.replace('-', ' ')}</span>
                      <span className="font-black text-black">{s.base_stat}</span>
                    </div>
                    <div className="w-full bg-white border-[3px] border-black rounded-full h-5 relative overflow-hidden">
                      <div 
                        className={`h-full border-r-[3px] border-black ${s.base_stat > 70 ? 'bg-[#ccff00]' : s.base_stat > 40 ? 'bg-[#b5d5ff]' : 'bg-[#ff7675]'}`} 
                        style={{ width: `${Math.min((s.base_stat / 255) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Detail;
