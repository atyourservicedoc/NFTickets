import '../styles/globals.css'

// loading Web3Auth module doesn't work properly with SSR, load it client-side only:
import dynamic from 'next/dynamic'
import MoralisWrapper from '../moralis/MoralisWrapper'
const Web3AuthProvider = dynamic(() =>
  import('../web3auth/Web3AuthProvider'),
  { ssr: false }
)

/*
const MoralisWrapper = dynamic(() =>
  import('../moralis/MoralisWrapper'),
  { ssr: false }
)
*/

function MyApp({ Component, pageProps }) {
  return (
    <Web3AuthProvider>
      <MoralisWrapper>
        <Component {...pageProps} />
      </MoralisWrapper>
    </Web3AuthProvider>
  )
}

export default MyApp
