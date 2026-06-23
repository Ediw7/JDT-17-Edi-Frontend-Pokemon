import { createContext, useContext, useEffect, useState } from 'react';
import type { MyPokemon, Pokemon } from '../types';

interface PokemonContextType {
  myPokemon: MyPokemon[];
  catchPokemon: (pokemon: Pokemon, nickname: string) => boolean;
  releasePokemon: (nickname: string) => void;
  checkNicknameExists: (nickname: string) => boolean;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: React.ReactNode }) => {
  const [myPokemon, setMyPokemon] = useState<MyPokemon[]>(() => {
    const saved = localStorage.getItem('myPokemon');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('myPokemon', JSON.stringify(myPokemon));
  }, [myPokemon]);

  const checkNicknameExists = (nickname: string) => {
    return myPokemon.some(p => p.nickname.toLowerCase() === nickname.toLowerCase());
  };

  const catchPokemon = (pokemon: Pokemon, nickname: string) => {
    if (checkNicknameExists(nickname)) {
      return false; // Nickname already exists
    }
    setMyPokemon(prev => [...prev, { ...pokemon, nickname }]);
    return true;
  };

  const releasePokemon = (nickname: string) => {
    setMyPokemon(prev => prev.filter(p => p.nickname !== nickname));
  };

  return (
    <PokemonContext.Provider value={{ myPokemon, catchPokemon, releasePokemon, checkNicknameExists }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};
