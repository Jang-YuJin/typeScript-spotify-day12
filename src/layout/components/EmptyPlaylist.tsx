import { Alert, Button, Modal, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { getSpotifyAuthUrl } from '../../utils/auth';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import PlaylistCreateModal from './PlaylistCreateModal';
import ErrorMessage from '../../common/components/error/ErrorMessage';

const EmptyContainer = styled('div')({
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    margin: '0px 10px',
    padding: '15px'
});

const EmptyPlaylist = () => {
  const {data: userProfile} = useGetCurrentUserProfile();
  const {mutate: createPlaylist, isSuccess, error} = useCreatePlaylist();
  const [open, setOpen] = useState<boolean>(false);

  const clickCreatePlaylist = (name: string) => {
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
    <EmptyContainer>
      <Typography fontSize={'larger'} fontWeight={700}>Create your first playlist</Typography>
      <Typography>It's easy, we'll help you</Typography>
      <Button variant='contained' color='secondary' sx={{'marginTop': '15px'}} onClick={handleOpen}><Typography fontWeight={700}>Create Playlist</Typography></Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
        <PlaylistCreateModal clickAddBtn={clickCreatePlaylist} createPlaylist={createPlaylist}></PlaylistCreateModal>
      </Modal>
    </EmptyContainer>
  )
}

export default EmptyPlaylist
