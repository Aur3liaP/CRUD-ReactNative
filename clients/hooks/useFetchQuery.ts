import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const endpoint = 'http://192.168.1.139:3310/api'

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
        isFavorite: number;
        description: string;
    }>
}

export function useFetchQuery <T extends keyof API> (path: T) {
    return useQuery({
        queryKey: [path],
        queryFn: async () => {
            return fetch(endpoint+path, {
                headers: {
                    Accept : 'application/json'
                }
            }). then (r => r.json() as Promise<API[T]>)     
        }
    })
}

// export function useInfiniteFetchQuery<T extends keyof API> (path: T) {
//     return useInfiniteQuery({
//         queryKey: [path],
//         initialPageParam : endpoint + path,
//         queryFn : async ({pageParam}) => {
//             await wait(1)
//             return fetch(pageParam, {
//                 headers : {
//                     Accept: 'application/json'
//                 }
//             }). then (result => result.json()as Promise<API[T]>)
//         },
//         getNextPageParam: (lastPage) => {
//             if ("next" in lastPage) {
//                 return lastPage.next
//             }
//             return null
//         }
//     })

// }

function wait (duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration * 1000))
}