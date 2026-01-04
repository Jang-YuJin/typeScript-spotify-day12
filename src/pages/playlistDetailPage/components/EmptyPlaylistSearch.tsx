import React, { useEffect, useState } from 'react'
import './EmptyPlaylistSearch.style.css';
import useSearchItem from '../../../hooks/useSearchItem';
import { SEARCH_TYPE } from '../../../models/search';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Loading from '../../../common/components/loading/Loading';
import SearchResultList from './SearchResultList';
import ErrorMessage from '../../../common/components/error/ErrorMessage';
import { useInView } from 'react-intersection-observer';

const EmptyPlaylistSearch = () => {
  const [keyword, setKeyword] = useState<string>('');
  const {data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage} = useSearchItem({
    q: keyword,
    type: [SEARCH_TYPE.Track],
    limit: 50
  });
  const { ref, inView } = useInView();
  
  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  };

  useEffect(() => {
    if(inView && hasNextPage && !isFetchingNextPage){
      fetchNextPage();
    }
  }, [inView]);
  
  return (
    <div>
      <Box display={'inline-block'}>
        <Typography variant='h1' my={'10px'} marginY={3}>플레이리스트에 추가할 곡을 찾아보세요!</Typography>
        <TextField value={keyword} onChange={handleSearchKeyword} slotProps={{input: {startAdornment: (<InputAdornment position='start' ><SearchIcon style={{color: 'white'}}></SearchIcon></InputAdornment>)}}} variant='outlined' style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}} fullWidth placeholder='곡 검색하기'></TextField>
      </Box>
      {isLoading ? <Loading></Loading> : ''}
      {error ? <ErrorMessage errorMessage={error.message}></ErrorMessage>: ''}
      { data?.pages[0].tracks
      ? (data?.pages[0].tracks?.items.length > 0 
        ? data?.pages.map((item) => {
          if(!item.tracks) return;
          return <SearchResultList list={item.tracks?.items} ref={ref} isFetchingNextPage={isFetchingNextPage}></SearchResultList>
        })
        : <div style={{marginTop: '10px'}}>'{keyword}'에 대한 검색결과가 없습니다.</div>
        )
      : ''}
    </div>
  )
}

export default EmptyPlaylistSearch
