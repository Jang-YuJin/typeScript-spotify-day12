import React, { useEffect, useState } from 'react'
import EmptyPlaylist from './EmptyPlaylist'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import { useInView } from 'react-intersection-observer';
import PlaylistCard from '../../common/components/playlistCard/PlaylistCard';
import Loading from '../../common/components/loading/Loading';
import './Playlist.style.css'
import { useNavigate } from 'react-router';

const Playlist = () => {
  const { ref, inView } = useInView();
  const {data: user} = useGetCurrentUserProfile();
  const {data: playlist, hasNextPage, isFetchingNextPage, fetchNextPage} = useGetCurrentUserPlaylists({limit: 20, offset: 0});
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  const selectClick = (id: string): void => {
    if(id === selected){
      return ;
    }

    if(id === undefined || id === ''){
      setSelected('');
    } else{
      setSelected(id);
    }

    goToPlaylistDetail(id);
  };

  const goToPlaylistDetail = (id: string): void => {
    if(id === undefined || id === ''){
      navigate('/');
    } else{
      navigate(`/playlist/${id}`);
    }
  };

  useEffect(() => {
    if(inView && hasNextPage && !isFetchingNextPage){
      fetchNextPage();
    }
  }, [inView])

  if(!user){
    return <EmptyPlaylist></EmptyPlaylist>;
  }

  return (
    <div className='playlistContainer'>
      {playlist?.pages[0].total !== 0
      ? <div>
          {playlist?.pages.map((page) => 
            page.items.map((item) => {
              return <PlaylistCard key={item.id} image={item.images?.[0].url} ownerName={item.owner?.display_name} name={item.name} type={item.type} isSelected={item.id === selected} onClick={() => selectClick(item.id ? item.id : '')}></PlaylistCard>
            })
          )}
          <div ref={ref}>{isFetchingNextPage && <Loading></Loading>}</div>
        </div>
      : <EmptyPlaylist></EmptyPlaylist>}
      
    </div>
  )
}

export default Playlist
