import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Cartprovider from '../../cartproviders/cartprovider'
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function App({ Component, pageProps }: AppProps) {
  
  return <SkeletonTheme  baseColor="#313131" highlightColor="#525252"><Cartprovider> <Component {...pageProps} /></Cartprovider></SkeletonTheme>
}
