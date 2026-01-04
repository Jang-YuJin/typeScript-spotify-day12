import { create } from "zustand";

interface PlaylistStore {
    playlistId: string;
    setPlaylistId: (id: string) => void;
};

const playlistStore = create<PlaylistStore>((set) => ({
    playlistId: '',
    setPlaylistId: (id: string) => set(() => ({
        playlistId: id
    }))
}))

export default playlistStore;