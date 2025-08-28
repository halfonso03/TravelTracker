import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "./agent";
import type { TripFormData } from "../schemas/tripSchema";
import { useLocation } from "react-router-dom";


export const useTrips = (id?: number | null) => {

    const queryClient = useQueryClient();
    const location = useLocation();

    const { data: trips, isLoading: loadingTrips } = useQuery({
        queryKey: ["trips"],
        queryFn: async () => {
            const response = await agent.get('/travel/list');
            return response.data;
        },
        enabled: location.pathname == '/trips'
    })



    const { data: trip, isLoading: loadingTrip } = useQuery({
        queryKey: ["trips", id?.toString()],
        queryFn: async () => {
            const response = await agent.get<Trip>(`/travel/${id}`);
            return response.data;
        },
        enabled: /trips\/\d/.test(location.pathname) == true && id !== undefined
    })


    const createTrip = useMutation({
        mutationFn: async (trip: TripFormData) => {
            const response = await agent.post<Trip>('/travel', trip)
            console.log('response.date', response.data)
            return response.data;
        }
    })

    const updateTrip = useMutation({
        mutationFn: async (trip: TripFormData) => {
            console.log(123)
            await agent.put<Trip>(`/travel/${trip.id}`, trip)
        },
        onMutate: async (trip: TripFormData) => {
            await queryClient.invalidateQueries({
                queryKey: ["trips", trip.id.toString()],
            })

        }
    })


    const closeTrip = useMutation({
        mutationFn: async (id: number) => {
            await agent.post(`/travel/${id}/close`)
        },
        onMutate: async (id: number) => {
            await queryClient.cancelQueries({ queryKey: ["trips", id.toString()] });
            const previousItems = queryClient.getQueryData(["trips", id.toString()]);
            queryClient.setQueryData(["trips", id.toString()], (old: Trip) => {
                console.log('old', old)
                return { ...old, statusId: 2, status: "Closed" };
            });
            return { previousItems };
        }
    });


    const reopenTrip = useMutation({
        mutationFn: async (id: number) => {
            await agent.post(`/travel/${id}/open`)
        },
        onMutate: async (id: number) => {
            await queryClient.cancelQueries({ queryKey: ["trips", id.toString()] });
            const previousItems = queryClient.getQueryData(["trips", id.toString()]);
            queryClient.setQueryData(["trips", id.toString()], (old: Trip) => {
                console.log('old', old)
                return { ...old, statusId: 1, status: "Open" };
            });
            return { previousItems };
        }
    })

    return { trips, loadingTrips, trip, loadingTrip, createTrip, updateTrip, closeTrip, reopenTrip }

}

