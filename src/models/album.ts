import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ExternalURLs, Image } from "./commonType";

export interface GetNewReleasesResponse {
    albums: ApiResponse<SimplifiedAlbumObject>;
};

export interface SimplifiedAlbumObject {
    album_type: string;
    total_tracks: string;
    available_markets: string[];
    external_urls: ExternalURLs;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions?: {
        reason?: string;
    };
    type: string;
    uri: string;
    artists: Artist[];
};