import React from 'react'
import { PlaylistTrack } from '../../../models/playlist';
import { TableCell, TableRow } from '@mui/material';
import { Episode, Track } from '../../../models/track';
import moment from 'moment';
import './DesktopPlaylistItem.style.css'

interface DesktopPlaylistItemProps {
    index: number;
    item: PlaylistTrack;
}

const DesktopPlaylistItem = ({item, index}: DesktopPlaylistItemProps) => {
  const isEpisodeOrUndefined = (track: Track | Episode | undefined): track is Episode => {
    return track === undefined || track === null || 'description' in track; 
  };

  return (
    <TableRow>
        <TableCell>{index}</TableCell>
        <TableCell>
                   <span className='desktopPalylistItemImgContainer'>
                    <img className='desktopPlaylistItemsImg' src={!isEpisodeOrUndefined(item.track) && item.track?.album?.images[0] !== null ? item.track?.album?.images[0].url : '/noimg.png'}></img>
                    {item.track?.name || 'no name'}
                   </span>
        </TableCell>
        <TableCell>{isEpisodeOrUndefined(item.track) ? 'N/A' : item.track?.album?.name}</TableCell>
        <TableCell>{item.added_at ? moment(item.added_at).format('YYYY-MM-DD') : 'unknown'}</TableCell>
        <TableCell>{item.track?.duration_ms ? moment(item.track.duration_ms).format('mm:ss') : 'unknown'}</TableCell>
    </TableRow>
  )
}

export default DesktopPlaylistItem
