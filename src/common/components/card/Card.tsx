import { Typography } from '@mui/material'
import React from 'react'
import './Card.style.css'
import PlayButton from '../play/PlayButton';

interface CardProps {
    name: string;
    image: string;
    artistName: string | undefined;
};

const Card = ({image, name, artistName}: CardProps) => {
  return (
    <div className='cardContainer'>
      <img src={image}></img>
      <div className='palyButton'><PlayButton></PlayButton></div>
      <Typography className='nameTypo' marginTop={'10px'}>{name}</Typography>
      <Typography className='artistTypo' marginTop={'10px'}>{artistName === undefined ? 'No Artist' : artistName}</Typography>
    </div>
  )
}

export default Card
