import '../styles/globals.css'

// loading Web3Auth module doesn't work properly with SSR, load it client-side only:
import dynamic from 'next/dynamic'
const Web3AuthProvider = dynamic(
    () => import('../web3auth/Web3AuthProvider'),
    { ssr: false }
)

function MyApp({ Component, pageProps }) {
  return (
    <Web3AuthProvider>
      <Component {...pageProps} />
    </Web3AuthProvider>
  )
}

export default MyApp
