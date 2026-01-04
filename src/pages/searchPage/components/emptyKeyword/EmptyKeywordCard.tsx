import React from 'react'
import './EmptyKeywordCard.style.css'
import { Category } from '../../../../models/category'
import { getRandomRGBColor } from '../../../../utils/utils'
import { Grid } from '@mui/material'

interface EmptyKeywordCardProps {
    category: Category
}

const EmptyKeywordCard = ({category}: EmptyKeywordCardProps) => {
  return (
    <div className='emptyKeywordCardContainer' style={{backgroundColor: getRandomRGBColor()}}>
      <div className='emptyKeywordCardText'>{category.name}</div>
      <img src={category.icons[0].url} alt={category.name} className='emptyKeywordCardImg'></img>
    </div>
  )
}

export default EmptyKeywordCard
