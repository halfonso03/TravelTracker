import { useQuery } from "@tanstack/react-query"
import agent from "./agent";


export const useTrips = () => {

    // const location = useLocation();

    const { data: trips, isLoading: loadingTrips } = useQuery({
        queryKey: ["trips"],
        queryFn: async () => {
            const response = await agent.get<Trip[]>('/travel/list');

            const parsedTrips: Trip[] = response.data.map(r => ({
                ...r,
                fromDate: new Date(r.fromDate),
                toDate: new Date(r.toDate),
                approvedDate: new Date(r.approvedDate),
                submittedDate: r.submittedDate != null ? new Date(r.submittedDate) : undefined
            }));

            return parsedTrips;
        },
        // enabled: location.pathname == '/trips'
    })




    return { trips, loadingTrips }

}

