import { styled, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router'
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import SearchIcon from '@mui/icons-material/Search';
import PlaylistHead from './components/PlaylistHead';
import Playlist from './components/Playlist';
import Navbar from './components/Navbar';

const Layout = styled('div')({
  display: 'flex',
  height: '100vh',
  padding: '8px'
});

const Logo = styled('img')({
  width: '150px',
  marginBottom: '10px',
  cursor: 'pointer'
});

const Sidebar = styled('div')(({theme}) => ({
  width: '300px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

const ContentBox = styled(Box)(({theme}) => ({
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: '100%',
  padding: '8px',
  marginBottom: '8px',
  marginRight: '8px',
  minWidth: 0
}));

const NavList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0
});

const StyledNavLink = styled(NavLink)(({theme}) => ({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  margin: '10px 10px',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.text.primary
  },
  '&.active': {
    color: theme.palette.text.primary
  },
}));

const AppLayout = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  }

  return (
    <Layout>
      <Sidebar>
        <ContentBox>
          <div>
            <Logo src={'/Spotify_Full_Logo_RGB_White.png'} onClick={goToHome}></Logo>
          </div>
          <NavList>
            <StyledNavLink to={'/'}><HomeFilledIcon></HomeFilledIcon><Typography variant='h2' fontWeight={700}>Home</Typography></StyledNavLink>
            <StyledNavLink to={'/search'}><SearchIcon></SearchIcon><Typography variant='h2' fontWeight={700}>Search</Typography></StyledNavLink>
          </NavList>
        </ContentBox>
        <ContentBox sx={{'height': '100%', 'padding': '0px'}}>
          <PlaylistHead></PlaylistHead>
          <Playlist></Playlist>
        </ContentBox>
      </Sidebar>
      <ContentBox sx={{'marginLeft': '8px', 'marginRight': '0px'}}>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </ContentBox>
    </Layout>
  )
}

export default AppLayout
