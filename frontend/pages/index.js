import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useContext, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Web3AuthContext } from '../web3auth/Web3AuthContext'

export default function Home() {

  const [web3AuthIsReady, setWeb3AuthIsReady] = useState(false);
  const web3auth = useContext(Web3AuthContext);

  useEffect(async () => {
    // init modal
    await web3auth.initModal();

    // enable login button
    setWeb3AuthIsReady(true);
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <button disabled={!web3AuthIsReady} onClick={async () => 
            {
              try {
                const provider = await web3auth.connect();
              } catch (e) {
                console.log(e);
              }
            }
          }>
            Login with Web3Auth
          </button>
        </h1>

        <p className={styles.description}>
        </p>

        
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
