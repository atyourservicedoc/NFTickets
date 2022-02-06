import '../styles/globals.css'
import { useEffect } from 'react'
import { ChakraProvider } from "@chakra-ui/provider";
import Layout from '../component/layout/main';
import { AnimatePresence } from "framer-motion";

// loading Web3Auth module doesn't work properly with SSR, load it client-side only:
import dynamic from 'next/dynamic'
import MoralisWrapper from '../moralis/MoralisWrapper'
const Web3AuthProvider = dynamic(() =>
  import('../web3auth/Web3AuthProvider'),
  { ssr: false }
)

const Website = ({Component, pageProps, router}) => {
  
    useEffect(() => {
      // Set page background to black
      document.body.style.backgroundColor = "#000000";
    })
  
    return (
      <Web3AuthProvider>
        <MoralisWrapper>
          <ChakraProvider>
            <Layout router={router}>
              <AnimatePresence exitBeforeEnter initial={true}>
                <Component {...pageProps} key={router.route} />
              </AnimatePresence>
            </Layout>
          </ChakraProvider>
        </MoralisWrapper>
      </Web3AuthProvider>
    )
}

export default Website