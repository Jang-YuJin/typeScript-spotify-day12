import { SimplifiedAlbumObject } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { SimplifiedPlaylistObject } from "./playlist";
import { Show, SimplifiedAudiobook, SimplifiedEpisode, Track } from "./track";

export enum SEARCH_TYPE {
    Track = 'track',
    Album = 'album',
    Playlist = 'playlist',
    Show = 'show',
    Episode = 'episode',
    Audiobook = 'audiobook',
    Artist = 'artist'
};

export interface SearchRequest {
    q: string;
    type: SEARCH_TYPE[];
    market?: string;
    limit?: number;
    offset?: number;
    include_external?: string;
};

export interface SearchResponse {
    artists?: ApiResponse<Artist>;
    albums?: ApiResponse<SimplifiedAlbumObject>;
    tracks?: ApiResponse<Track>;
    playlists?: ApiResponse<SimplifiedPlaylistObject>;
    shows?: ApiResponse<Show>;
    episodes?: ApiResponse<SimplifiedEpisode>;
    audiobooks?: ApiResponse<SimplifiedAudiobook>;
}