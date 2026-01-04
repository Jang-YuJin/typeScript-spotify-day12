import { SimplifiedAlbumObject } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { External_ids, ExternalURLs, Followers, Image, Owner } from "./commonType";
import { Episode, Track } from "./track";

export interface BasePalylist {
    collaborative?: boolean;
    description?: string | null;
    external_urls?: ExternalURLs;
    href?: string;
    id?: string;
    images?: Image[];
    name?: string;
    owner?: Owner;
    public?: boolean;
    snapshot_id?: string;
    type?: 'palylist';
    uri?: string;
}

export interface GetCurrentUserPlaylistsRequest {
    limit?: number;
    offset?: number;
};

export type GetCurrentUserPlaylistsResponse = ApiResponse<SimplifiedPlaylistObject>;

export interface SimplifiedPlaylistObject extends BasePalylist{
    tracks?: {
        href?: string;
        total?: number;
    };
};

export interface GetPlaylistRequest {
    playlistId: string;
    market?: string;
    fields?: string;
    additionalTypes?: string;
};

export interface Playlist extends BasePalylist{
    tracks?: ApiResponse<PlaylistTrack>;
    followers: Followers;
};

export interface PlaylistTrack {
    added_at?: string | null;
    added_by?: {
        external_urls?: {
            spotify?: string;
        };
        href?: string;
        id?: string;
        type?: 'user';
        uri?: string;
    } | null;
    is_local?: boolean;
    track?: Track | Episode;
    type: 'playlist';
    uri: string;
};

export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
    offset?: number;
    limit?: number;
};

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>;

export interface CreatePlaylistRequest {
    name: string;
    playlistPublic?: boolean;
    collaborative?: boolean;
    description?: string;
};

export interface AddItemsToPlaylistRequest {
    playlistId: string;
    position?: number;
    uris?: string[];
};

export interface AddItemsToPlaylistResponse {
    snapshot_id: string;
};