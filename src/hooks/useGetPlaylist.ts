import { useQuery } from "@tanstack/react-query";
import { GetPlaylistRequest } from "../models/playlist";
import { getPalylist } from "../apis/playlistApi";

const useGetPlaylist = (params: GetPlaylistRequest) => {
    return useQuery({
        queryKey: ['playlist-detail', params.playlistId],
        queryFn: () => {
            return getPalylist(params);
        },
        enabled: !!params.playlistId
    })
};

export default useGetPlaylist;