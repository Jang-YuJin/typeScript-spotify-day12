export interface ExternalURLs {
    spotify?: string;
};

export interface Image {
    url: string;
    height: number | null;
    width: number | null;
};

export interface Followers {
    href?: string | null;
    total?: number;
};

export interface Explicit_content {
    filter_enabled?: boolean;
    filter_locked?: boolean;
};

export interface Owner {
    external_urls?: ExternalURLs;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
    display_name?: string | null;
};

export interface External_ids {
    isrc?: string;
    ean?: string;
    upc?: string;
}