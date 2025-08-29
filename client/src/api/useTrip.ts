import { useQuery } from "@tanstack/react-query"
import agent from "./agent";

export const useTrip = (id: string) => {


    const { data: trip, isLoading: loadingTrip } = useQuery({
        queryKey: ["trips", id],
        queryFn: async () => {
            const response = await agent.get<Trip>(`/travel/${id}`);
            return response.data;
        },
        // enabled: /trips\/\d/.test(location.pathname) == true && id !== undefined
    })

    return { trip, loadingTrip }

}