import React, { forwardRef } from 'react'
import './SearchResultList.style.css'
import { Track } from '../../../models/track';
import { Button, Table, TableBody, TableCell, TableRow, Typography, useMediaQuery } from '@mui/material';
import playlistStore from '../../../store/playlistStore';
import useAddItemsToPlaylist from '../../../hooks/useAddItemsToPlaylist';
import ErrorMessage from '../../../common/components/error/ErrorMessage';

interface SearchResultListProps {
    track: Track;
}

const SearchResultList = forwardRef<HTMLTableRowElement, SearchResultListProps>(
  ({ track }, ref) => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const {mutate: addItemsToPlaylist} = useAddItemsToPlaylist();
  const {playlistId} = playlistStore();

  const handleAdd = (track: Track) => {
    if(track.id){
      addItemsToPlaylist({
        playlistId: playlistId,
        uris: [track.uri]
      });
    } else{
      return <ErrorMessage errorMessage='관리자에게 문의해주세요.'></ErrorMessage>
    }
  };

  return (
        <TableRow ref={ref}>
          <TableCell>
            <span className='searchResultImgContainer'>
              <img className='searchResultImg' src={track.album?.images[0].url ?? '/noimg.png'}></img>
              <span className='searchResultImgInfoContainer'>
                <Typography fontWeight={700}>{track.name ?? 'No name'}</Typography>
                <Typography color='text.secondary'>{track.album?.artists[0].name ?? 'Unknown'}</Typography>
              </span>
            </span>
            </TableCell>
            {isMobile ? '' : <TableCell>{track.album?.name}</TableCell>}
            <TableCell>
              <Button variant='outlined' onClick={() => handleAdd(track)}>추가</Button>
            </TableCell>
        </TableRow>
  )
}
);

export default SearchResultList