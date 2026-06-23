export interface Pokemon {
  id: number;
  name: string;
  url: string;
  image: string;
}

export interface MyPokemon extends Pokemon {
  nickname: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
      showdown?: {
        front_default: string;
      };
    };
  };
}
