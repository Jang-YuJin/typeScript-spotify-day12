import React from 'react'
import './SearchResultList.style.css'
import { Track } from '../../../models/track';
import { Button, Table, TableBody, TableCell, TableRow, Typography, useMediaQuery } from '@mui/material';
import Loading from '../../../common/components/loading/Loading';
import useAddItemsToPlaylist from '../../../hooks/useAddItemsToPlaylist';
import ErrorMessage from '../../../common/components/error/ErrorMessage';
import playlistStore from '../../../store/playlistStore';

interface SearchResultListProps {
    list: Track[];
    ref: (node?: Element | null | undefined) => void;
    isFetchingNextPage: boolean;
}

const SearchResultList = ({list, ref, isFetchingNextPage}: SearchResultListProps) => {
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
    <TableBody className='searchResultTable'>
      {list.map((track, index) => (
        <TableRow key={index}>
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
      ))}
      <TableRow ref={ref}>{isFetchingNextPage && <Loading></Loading>}</TableRow>
    </TableBody>
  )
}

export default SearchResultList
