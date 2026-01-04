import { Grid, Typography } from '@mui/material'
import React from 'react'
import useGetNewReleases from '../../../hooks/useGetNewReleases'
import Loading from '../../../common/components/loading/Loading';
import ErrorMessage from '../../../common/components/error/ErrorMessage';
import Slide from '../../../common/components/slide/Slide';

const NewReleases = () => {
  const {data, error, isLoading} = useGetNewReleases();

  if(isLoading){
    return <Loading></Loading>;
  }

  if(error){
    return <ErrorMessage errorMessage={error.message}></ErrorMessage>
  }

  return (
    <div>
      <Typography variant='h1' paddingTop={'8px'}>New Released Albums</Typography>
      {data && data.albums.items.length > 0
      ? 
        <Slide list={data.albums.items}></Slide>
      : <Typography variant='h2'>No data</Typography>}
    </div>
  )
}

export default NewReleases
