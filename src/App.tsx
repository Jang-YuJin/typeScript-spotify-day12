import React, { Suspense, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Loading from './common/components/loading/Loading';
import useExchangeToken from './hooks/useExchangeToken';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./pages/homPage/HomePage'));
const SearchPage = React.lazy(() => import('./pages/searchPage/SearchPage'));
const SearchWithKeywordPage = React.lazy(() => import('./pages/searchWithKeywordPage/SearchWithKeywordPage'));
const PlaylistDetailPage = React.lazy(() => import('./pages/playlistDetailPage/PlaylistDetailPage'));
const PlaylistPage = React.lazy(() => import('./pages/playlistPage/PlaylistPage'));

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  const codeVerifier = localStorage.getItem('code_verifier');
  const {mutate: exchangeToken} = useExchangeToken();

  useEffect(() => {
    if(code && codeVerifier){
      exchangeToken({code, codeVerifier});
    }
  }, [code, codeVerifier, exchangeToken]);

  return (
    <Suspense fallback={<Loading></Loading>}>
      <Routes>
        <Route path='/' element={<AppLayout></AppLayout>}>
          <Route index element={<HomePage></HomePage>}></Route>
          <Route path='search' element={<SearchPage></SearchPage>}></Route>
          <Route path='search/:keyword' element={<SearchWithKeywordPage></SearchWithKeywordPage>}></Route>
          <Route path='playlist/:id' element={<PlaylistDetailPage></PlaylistDetailPage>}></Route>
          <Route path='playlist' element={<PlaylistPage></PlaylistPage>}></Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
