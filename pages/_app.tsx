import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "@mui/material";
import { theme } from '../app/configs/muitheme';
import createEmotionCache from '@/app/utils/createEmotionCache';
import { CacheProvider } from "@emotion/react";
import AppNavBar from '@/app/components/NavBar';
import { Provider } from 'react-redux';
import store from '@/app/store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ToastContainer />
      <CacheProvider value={clientSideEmotionCache}>
        <ThemeProvider theme={theme}>
          <AppNavBar>
            <Component {...pageProps} />
          </AppNavBar>
        </ThemeProvider> 
      </CacheProvider>
    </Provider>
  )
}
