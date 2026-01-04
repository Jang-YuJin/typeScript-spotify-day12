import React from 'react'
import './PlaylistCard.style.css'
import { Typography } from '@mui/material';

interface PlaylistCardProps {
    image?: string;
    ownerName?: string | null;
    name?: string;
    type?: string;
    isSelected?: boolean;
    onClick?: () => void;
}

const PlaylistCard = ({image, ownerName, name, type, isSelected, onClick}: PlaylistCardProps) => {
  return (
    <div className={`palylistCardContainer ${isSelected ? 'playlistActive' : ''}`} onClick={onClick}>
      <img className='playlistCardImg' src={image ? image : '/noimg.png'}></img>
      <div className='palylistInfoContainer'>
        <Typography color='primary.main' sx={{fontWeight: 700}}>{name ? name : ''}</Typography>
        {ownerName
        ? <div>{type} • {ownerName}</div>
        : <div></div>
        }
      </div>
    </div>
  )
}

export default PlaylistCard
