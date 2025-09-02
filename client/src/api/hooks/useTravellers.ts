import { useQuery } from "@tanstack/react-query"
import agent from "../agent";


export const useTravellers = () => {

    // const location = useLocation();

    const { data: travellers, isLoading: loadingTravellers } = useQuery({
        queryKey: ["travellers"],
        queryFn: async () => {
            const response = await agent.get<Traveller[]>('/travellers/list');
            return response.data;
            // const travellers: Traveller[] = response.data.map(r => ({
            //     ...r,

            // }));

            // return travellers;
        },
    })




    return { travellers, loadingTravellers }

}

