import { useQuery } from "@tanstack/react-query";

export function useFetchQuery(path: string){
    return useQuery({
        queryKey: [path],
        queryFn: async () => {
            await wait(1) 
            const response = await fetch('http://localhost:3310/api' + path);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();         
        }
    })
}

function wait (duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration * 1000))
}