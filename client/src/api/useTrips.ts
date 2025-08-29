import { useQuery } from "@tanstack/react-query"
import agent from "./agent";


export const useTrips = () => {

    // const location = useLocation();

    const { data: trips, isLoading: loadingTrips } = useQuery({
        queryKey: ["trips"],
        queryFn: async () => {
            const response = await agent.get('/travel/list');
            return response.data;
        },
        // enabled: location.pathname == '/trips'
    })




    return { trips, loadingTrips }

}

