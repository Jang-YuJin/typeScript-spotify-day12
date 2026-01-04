import { SimplifiedAlbumObject } from "./album";
import { Artist } from "./artist";
import { External_ids, ExternalURLs, Image } from "./commonType";

export interface Track {
    album?: SimplifiedAlbumObject;
    artists?: Artist[];
    available_markets?: string[];
    disc_number?: number;
    duration_ms?: number;
    explicit?: boolean;
    external_ids?: External_ids;
    external_urls?: ExternalURLs;
    href?: string;
    id?: string;
    is_playable?: boolean;
    linked_from?: {};
    restrictions?: {
        reason: string;
    };
    name?: string;
    popularity?: number;
    preview_url?: string | null;
    track_number?: number;
    type?: 'track';
    uri: string;
    is_local: boolean;
};

export interface Episode {
    audio_preview_url: string | null;
    description: string;
    html_description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalURLs;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    language?: string;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: string;
    resume_point?: {
        fully_played?: boolean;
        resume_position_ms?: number;
    };
    type: string;
    uri: string;
    restrictions?: {
        reason: string;
    };
    show: Show;
};

export type SimplifiedEpisode = Omit<Episode, 'show'>;

export interface Show {
    available_markets: string[];
    copyrights: {
        text: string;
        type: string;
    }[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: ExternalURLs;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: 'show';
    uri: string;
    total_episodes: number;
};

export interface SimplifiedAudiobook {
    authors: Author[];
    available_markets: string[];
    copyrights: Copyright[];
    description: string;
    html_description: string;
    edition?: string;
    explicit: boolean;
    external_urls: ExternalURLs;
    href: string;
    id: string;
    images: Image[];
    languages: string[];
    media_type: string;
    name: string;
    narrators: Narrator[];
    publisher: string;
    type: string;
    uri: string;
    total_chapters: number;
};

export interface Author {
    name?: string;
};

export interface Copyright {
    text?: string;
    type?: string;
};

export interface Narrator {
    name?: string;
};