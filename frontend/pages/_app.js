import '../styles/globals.css'
import { useEffect } from 'react'

// loading Web3Auth module doesn't work properly with SSR, load it client-side only:
import dynamic from 'next/dynamic'
import MoralisWrapper from '../moralis/MoralisWrapper'
const Web3AuthProvider = dynamic(() =>
  import('../web3auth/Web3AuthProvider'),
  { ssr: false }
)

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // Set page background to black
    document.body.style.backgroundColor = "#000000";
  })

  return (
    <Web3AuthProvider>
      <MoralisWrapper>
        <Component {...pageProps} />
      </MoralisWrapper>
    </Web3AuthProvider>
  )
}

export default MyApp
