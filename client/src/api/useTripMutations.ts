import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { TripFormData } from "../schemas/tripSchema";
import agent from "./agent";

export const useTripMutations = () => {

    const queryClient = useQueryClient();


    const createTrip = useMutation({
        mutationFn: async (trip: TripFormData) => {
            const response = await agent.post<Trip>('/travel', trip)
            return response.data;
        }
    })

    const updateTrip = useMutation({
        mutationFn: async (trip: TripFormData) => {
            const id = trip.id;
            await agent.put<Trip>(`/travel/${id}`, trip);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["trips"],
            })
        }
    })


    const closeTrip = useMutation({
        mutationFn: async (id: string) => {
            await agent.post(`/travel/${id}/close`)
            return id;
        },
        onSuccess(data) {
            console.log(data);

        },
        onMutate: async (id: string) => {
            await queryClient.cancelQueries({ queryKey: ["trips", id] });
            const previousItems = queryClient.getQueryData(["trips", id]);
            queryClient.setQueryData(["trips", id.toString()], (old: Trip) => {
                console.log('old', old)
                return { ...old, statusId: 2, status: "Closed" };
            });
            return { previousItems };
        }
    });


    const reopenTrip = useMutation({
        mutationFn: async (id: string) => {
            await agent.post(`/travel/${id}/open`)
        },
        onSuccess(data) {
            console.log(data);

        },
        onMutate: async (id: string) => {
            await queryClient.cancelQueries({ queryKey: ["trips", id] });
            const previousItems = queryClient.getQueryData(["trips", id]);
            queryClient.setQueryData(["trips", id.toString()], (old: Trip) => {
                console.log('old', old)
                return { ...old, statusId: 1, status: "Open" };
            });
            return { previousItems };
        }
    })

    return { createTrip, updateTrip, reopenTrip, closeTrip }
}