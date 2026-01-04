import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import Loading from '../../common/components/loading/Loading';
import { Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import './PlaylistDetailPage.style.css';
import { useInView } from 'react-intersection-observer';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DesktopPlaylistItem from './components/DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import axios from 'axios';
import ErrorMessage from '../../common/components/error/ErrorMessage';
import LoginButton from '../../common/components/login/LoginButton';
import EmptyPlaylistSearch from './components/EmptyPlaylistSearch';
import playlistStore from '../../store/playlistStore';

const PlaylistDetailPage = () => {
  const {id} = useParams<{id: string}>();
  const {setPlaylistId} = playlistStore();

  if(id === undefined){
    return <Navigate to={'/'}></Navigate>
  }

  const {data: playlist, isLoading: isPlaylistLoading, error: playlistError} = useGetPlaylist({playlistId: id});
  const {data: playlistItems, isLoading: isPlaylistItemsLoading, error: playlistItemsError, hasNextPage, isFetchingNextPage, fetchNextPage} = useGetPlaylistItems({playlistId: id});
  const isUnauthorized = (axios.isAxiosError(playlistError) && playlistError.response?.status === 401) || (axios.isAxiosError(playlistItemsError) && playlistItemsError.response?.status === 401);
  const { ref, inView } = useInView();
  const { ref: headRef, inView: isHeadVisible } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if(inView && hasNextPage && !isFetchingNextPage){
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if(id !== undefined && id !== null && id !== ''){
      setPlaylistId(id);
    }
  }, [id]);

  if(isPlaylistLoading || isPlaylistItemsLoading){
    return <Loading></Loading>
  }

  if(isUnauthorized){
    return (
      <Box width={'100%'} height={'300px'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Typography fontSize={'xxx-large'} fontWeight={700} mb={'10px'}>Oops!</Typography>
        <Typography fontSize={'larger'} mb={'10px'}>다시 로그인해주세요!</Typography>
        <LoginButton></LoginButton>
      </Box>
    )
  }

  if(playlistError || playlistItemsError){
    return <ErrorMessage errorMessage={playlistError?.message || playlistItemsError?.message || '에러가 발생했습니다. 관리자에게 문의바랍니다.'}></ErrorMessage>
  }

  return (
    <div className='playlistDetailContainer'>
      <div className={`playlistStickyHeader ${!isHeadVisible ? 'visible' : ''}`}>
        <div className="stickyHeaderContent">
          <PlayCircleIcon color='primary'></PlayCircleIcon>
          <span className="stickyPlaylistName">{playlist?.name}</span>
        </div>
      </div>
      <div ref={headRef}></div>
      <Grid className='playlistHeadContainer' container spacing={2}>
        <Grid size={{xl: 2, lg: 3, md: 4, sm: 12, xs: 12}} display={'flex'} flexDirection={'column'} alignItems={'center'}>
          {playlist?.images?.[0]
          ? <img className='playlistHeadImg' src={playlist.images[0].url}></img>
          : <div className='playlistHeadNoImg'><MusicNoteIcon></MusicNoteIcon></div>}
        </Grid>
        <Grid size={{xl: 10, lg: 9, md: 8, sm: 12, xs: 12}}>
          <Grid size={12} style={{ minHeight: '100%' }} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                <div>{playlist?.public ? '공개 플레이리스트' : '비공개 플레이리스트'}</div>
                <span className='playlistHeadName'>{playlist?.name}</span>
                <div className='playlistHeadinfoContainer'>
                  <img className='playlistHeadLogoImg' src={'/Spotify_Primary_Logo_RGB_Green.png'}></img>
                  <span>{playlist?.owner?.display_name ? playlist?.owner?.display_name : 'unknown'}</span>
                  {playlist?.followers.total === 0 || playlist?.followers.total === undefined 
                  ? '' 
                  : <span>
                      <span className='dot'> • </span>
                      <span>{'저장 횟수: ' + playlist?.followers.total.toLocaleString('ko-KR')}</span>
                    </span>}
                  <span className='dot'> • </span>
                  <span>{playlist?.tracks?.total}곡</span>
                </div>
          </Grid>
        </Grid>
      </Grid>
      
      {playlist?.tracks?.total === 0
      ? <EmptyPlaylistSearch></EmptyPlaylistSearch>
      :
      <div className='playlistBodyContainer'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>앨범</TableCell>
              <TableCell>추가한 날짜</TableCell>
              <TableCell><AccessTimeIcon></AccessTimeIcon></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playlistItems?.pages.map((page, pageIndex) => page.items.map((item, itemIndex) => {
              return <DesktopPlaylistItem item={item} key={pageIndex * PAGE_LIMIT + itemIndex + 1} index={pageIndex * PAGE_LIMIT + itemIndex + 1}></DesktopPlaylistItem>
            }))}
            <TableRow sx={{ height: "5px" }} ref={ref} />
              {isFetchingNextPage && <Loading />}
          </TableBody>
      </Table>
      </div>
      }
    </div>
  )
}

export default PlaylistDetailPage
