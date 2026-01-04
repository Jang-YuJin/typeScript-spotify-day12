import axios from "axios";
import { AddItemsToPlaylistRequest, AddItemsToPlaylistResponse, CreatePlaylistRequest, GetCurrentUserPlaylistsRequest, GetCurrentUserPlaylistsResponse, GetPlaylistItemsRequest, GetPlaylistItemsResponse, GetPlaylistRequest, Playlist } from "../models/playlist";
import api from "../utils/api";

export const getCurrentUserPlaylists = async({limit, offset}: GetCurrentUserPlaylistsRequest): Promise<GetCurrentUserPlaylistsResponse> => {
    try {
        const response = await api.get('/me/playlists', {
            params: {limit, offset}
        });

        return response.data;
    } catch (error) {
        throw new Error('Fail to fetch user playlists!');
    }
};

export const getPalylist = async(params: GetPlaylistRequest): Promise<Playlist> => {
    try {
        const response = await api.get(`/playlists/${params.playlistId}`, {
            params
        });
        
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error; // 🔥 status 포함된 에러 유지
        }
        
        throw new Error('Fail to fetch playlist detail!');
    }
};

export const getPlaylistItems = async(params: GetPlaylistItemsRequest): Promise<GetPlaylistItemsResponse> => {
    try {
        const response = await api.get(`/playlists/${params.playlistId}/tracks`, {
            params
        })

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error; // 🔥 status 포함된 에러 유지
        }
        
        throw new Error('Fail to fetch playlist items!');
    }
};

export const createPlaylist = async(userId: string, params: CreatePlaylistRequest): Promise<Playlist> => {
    try {
        const {name, playlistPublic, collaborative, description} = params;
        const response = await api.post(`/users/${userId}/playlists`, {
            name,
            public: playlistPublic,
            collaborative,
            description
        });

        return response.data;
    } catch (error) {
        throw new Error('Fail to create playlist!');
    }
};

export const addItemsToPlaylist = async(params: AddItemsToPlaylistRequest): Promise<AddItemsToPlaylistResponse> => {
    try {
        const {playlistId, position, uris} = params;
        const response = await api.post(`/playlists/${playlistId}/tracks`, {
            position,
            uris
        });

        return response.data;
    } catch (error) {
        throw new Error('Fail to add playlist items!')
    }
};