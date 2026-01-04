import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPlaylist } from "../apis/playlistApi";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { CreatePlaylistRequest } from "../models/playlist";

const useCreatePlaylist = () => {
    const {data: user} = useGetCurrentUserProfile();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: CreatePlaylistRequest) => {
            if(user?.id){
                return createPlaylist(user?.id, params)
            }
            return Promise.reject(new Error('User is not defined!'));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['current-user-playlists']});
        }
    });
}

export default useCreatePlaylist;