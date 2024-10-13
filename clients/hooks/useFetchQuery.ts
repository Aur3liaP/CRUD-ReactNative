import { useQuery } from "@tanstack/react-query";

const endpoint = 'http://localhost:3310/api'

type API = {
    '/pokemons': Array<{
        id: number;
        pokedex_number: number;
        name: string;
        type1: string;
        type2: string | null;
        hp: number;
        attack: number;
        defense: number;
        special_attack: number;
        special_defense: number;
        speed: number;
        image_url: string;
        description: string;
    }>
    '/team' : Array<{
        id: number;
        pokedex_number: number;
        name: string;
        type1: string;
        type2: string | null;
        hp: number;
        attack: number;
        defense: number;
        special_attack: number;
        special_defense: number;
        speed: number;
        image_url: string;
        level: number;
        description: string;
    }>
}

export function useFetchQuery<T extends keyof API>(path: T) {
    return useQuery({
      queryKey: [path],
      queryFn: async () => {
        const response = await fetch(endpoint + path, {
          headers: {
            Accept: 'application/json',
          },
        });
        return response.json() as Promise<API[T]>;
      },
    });
  }
