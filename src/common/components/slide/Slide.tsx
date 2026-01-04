import React from 'react'
import Card from '../../../common/components/card/Card';
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { SimplifiedAlbumObject } from '../../../models/album';
import './Slide.style.css'

const responsive = {
  xl: {
    breakpoint: { max: 4000, min: 1536 },
    items: 6
  },
  lg: {
    breakpoint: { max: 1200, min: 900 },
    items: 4
  },
  md: {
    breakpoint: { max: 900, min: 600 },
    items: 3
  },
  sm: {
    breakpoint: { max: 600, min: 0 },
    items: 2
  }
};

const Slide = ({list}: {list: SimplifiedAlbumObject[]}) => {
  return (
      <div className='slideContainer'>
        <Carousel
        responsive={responsive}
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={1500}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={true}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        >
        {list.map((item) => (<Card image={item.images[0].url} name={item.name} artistName={item.artists[0].name}></Card>))}
        </Carousel>
      </div>
  )
}

export default Slide
