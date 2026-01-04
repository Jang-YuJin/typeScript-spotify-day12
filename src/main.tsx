import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
//0. 사이드바(플레이리스트, 메뉴)
//1. 홈페이지 /
//2. 서치페이지 /search
//3. 서치 결과페이지  /search/:keyword
//4. 플레이리스트 디테일페이지  /playlist/:id
//5. (모바일) 플레이리스트 페이지 /playlist

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <StrictMode>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </StrictMode>
      </CssBaseline>
    </ThemeProvider>
  </BrowserRouter>,
)
