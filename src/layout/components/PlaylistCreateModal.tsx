import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { UseMutateFunction } from '@tanstack/react-query';
import { CreatePlaylistRequest, Playlist } from '../../models/playlist';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

interface PlayllistCreateModalProps{
    clickAddBtn: (name: string) => void;
    createPlaylist: UseMutateFunction<Playlist, Error, CreatePlaylistRequest, unknown>;
}

const PlaylistCreateModal = ({clickAddBtn}: PlayllistCreateModalProps) => {
  const [playlistName, setPlaylistName] = useState<string>('');

  const handlePlaylistName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value);
  };

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title">플레이리스트 추가</Typography>
      <TextField sx={{mt: 2}} placeholder='플레이리스트명을 입력하세요.' value={playlistName} onChange={handlePlaylistName}></TextField>
      <div style={{marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Button variant='outlined' onClick={() => clickAddBtn(playlistName)}>추가</Button>
      </div>
    </Box>
  )
}

export default PlaylistCreateModal
