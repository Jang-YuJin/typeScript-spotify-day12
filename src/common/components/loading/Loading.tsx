import React from 'react'
import { PulseLoader } from 'react-spinners'
import './Loading.style.css'

const Loading = () => {
  return (
    <div className='loadingContainer'>
      <PulseLoader color="#959595" />
    </div>
  )
}

export default Loading
