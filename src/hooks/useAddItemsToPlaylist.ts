import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddItemsToPlaylistRequest } from "../models/playlist";
import { addItemsToPlaylist } from "../apis/playlistApi";

const useAddItemsToPlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: AddItemsToPlaylistRequest) => {
            return addItemsToPlaylist(params);
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({queryKey: ['current-user-playlists']});
            queryClient.invalidateQueries({queryKey: ['playlist-detail', variables.playlistId]});
            queryClient.invalidateQueries({queryKey: ['playlist-items', variables.playlistId]});
        }
    });
};

export default useAddItemsToPlaylist;