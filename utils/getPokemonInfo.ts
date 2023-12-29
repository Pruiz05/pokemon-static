import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";

export const getPokemonInfo = async (search: string) => {
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${search}`);

  return {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
  };
};
