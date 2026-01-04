import React from 'react'
import { Grid, Typography } from '@mui/material'
import useGetSeveralBrowseCategories from '../../../../hooks/useGetSeveralBrowseCategories'
import EmptyKeywordCard from './EmptyKeywordCard'
import Loading from '../../../../common/components/loading/Loading'
import ErrorMessage from '../../../../common/components/error/ErrorMessage'

const EmptyKeyword = () => {
  const {data: categories, error, isLoading} = useGetSeveralBrowseCategories({limit: 24});

  if(isLoading) return <Loading></Loading>;

  if(error) return <ErrorMessage errorMessage={error.message}></ErrorMessage>;

  return (
    <div>
        <Typography variant='h1' fontWeight={700} my={3}>모두 둘러보기</Typography>
        <Grid container spacing={2}>
            {categories?.categories.items.map((category) => (
            <Grid size={{xs: 12, sm: 12, md: 6, lg: 4, xl: 4}}>
                <EmptyKeywordCard category={category}></EmptyKeywordCard>
            </Grid>
            ))}
        </Grid>
    </div>
  )
}

export default EmptyKeyword
