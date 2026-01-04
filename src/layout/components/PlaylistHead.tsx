import { Alert, Button, Modal, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { getSpotifyAuthUrl } from '../../utils/auth';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import PlaylistCreateModal from './PlaylistCreateModal';
import ErrorMessage from '../../common/components/error/ErrorMessage';

const PlaylistHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

const HeaderContent = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  margin: '10px 10px',
  padding: '8px',
  color: theme.palette.text.primary
}));

const PlaylistHead = () => {
  const {data: userProfile} = useGetCurrentUserProfile();
  const {mutate: createPlaylist, isSuccess, error} = useCreatePlaylist();
  const [open, setOpen] = useState<boolean>(false);

  const clickAddBtn = (name: string) => {
    if(name === undefined || name === null || name === ''){
      return alert('플레이리스트명을 입력하세요!');
    }

    createPlaylist({name: name});
  };

  const handleOpen = () => {
    if(!userProfile){
      getSpotifyAuthUrl();
      return;
    }
    
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if(isSuccess){
      setOpen(false);
    }
  }, [isSuccess])

  if(error){
    return <ErrorMessage errorMessage={error.message}></ErrorMessage>;
  }

  return (
    <div>
      <PlaylistHeader>
        <HeaderContent>
            <BookmarkIcon></BookmarkIcon><Typography variant='h2' fontWeight={700}>Your Playlist</Typography>
        </HeaderContent>
        <Button sx={{'marginBottom': '10px'}} onClick={handleOpen}><Typography fontSize={'x-large'} fontWeight={'lighter'}>+</Typography></Button>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
          <PlaylistCreateModal clickAddBtn={clickAddBtn} createPlaylist={createPlaylist}></PlaylistCreateModal>
        </Modal>
      </PlaylistHeader>
    </div>
  )
}

export default PlaylistHead