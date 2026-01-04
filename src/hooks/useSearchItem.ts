import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchRequest } from "../models/search";
import useClientCredentialToken from "./useClientCredentialToken";
import { searchItem } from "../apis/searchApi";

const useSearchItem = (params: SearchRequest) => {
    const clientCredentialToken = useClientCredentialToken();

    return useInfiniteQuery({
        queryKey: ['search-item', params],
        queryFn: ({pageParam = 0}) => {
            if(!clientCredentialToken){
                throw new Error('No token available');
            }

            return searchItem(clientCredentialToken, {...params, offset: pageParam});
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const nextPageUrl = lastPage.tracks?.next || lastPage.albums?.next || lastPage.artists?.next || lastPage.playlists?.next || lastPage.shows?.next || lastPage.episodes?.next || lastPage.audiobooks?.next;
            if(nextPageUrl){
                const nextOffset = new URL(nextPageUrl).searchParams.get('offset');
                return nextOffset ? parseInt(nextOffset) : undefined;
            }
            return undefined;
        },
        enabled: !!params.q
    })
};

export default useSearchItem;