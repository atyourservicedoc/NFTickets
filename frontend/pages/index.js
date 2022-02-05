import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useContext, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Web3AuthContext } from '../web3auth/Web3AuthContext'
import Web3AuthLoginButton from '../web3auth/Web3AuthLoginButton'

function Home() {

  const [web3AuthIsReady, setWeb3AuthIsReady] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const web3AuthProvider = useContext(Web3AuthContext);
  
  useEffect(async () => {
    // init modal
    try {
      await web3AuthProvider.web3auth.initModal();

      // enable login button
      setWeb3AuthIsReady(true);
    } catch (e) {
      console.log(e);
    }
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <link href="/dist/output.css" rel="stylesheet"></link>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Web3AuthLoginButton />
          <button disabled={!web3AuthIsReady} onClick={async () => {
            try {
              await web3AuthProvider.web3auth.connect();
            } catch (e) {
              console.log(e);
            }
          }
          }>
            Log in
          </button>
          <button disabled={!web3AuthIsReady} onClick={async () => {
            try {
              await web3AuthProvider.web3auth.logout();
            } catch (e) {
              console.log(e);
            }
          }
          }>
            Logout
          </button>
        </h1>

        <p className={styles.description}>
          {userInfo && userInfo}
        </p>


      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default function NewHome() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Web3AuthLoginButton />
    </div>
  )
}
