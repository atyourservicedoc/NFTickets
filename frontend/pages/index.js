import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Web3AuthContext } from '../web3auth/Web3AuthContext';
import { useContext, useEffect } from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import { ADAPTER_EVENTS } from '@web3auth/base';
import { useRouter } from 'next/router';

export default function Home() {

  // get web3auth context
  const web3AuthProvider = useContext(Web3AuthContext);

  // use router
  const router = useRouter();

  useEffect(() => {
    // Redirect to landing if not authenticated
    if (web3AuthProvider.sessionStatus == ADAPTER_EVENTS.DISCONNECTED) {
      router.push('/landing');
    }

    // Redirect to dashboard if authenticated
    if (web3AuthProvider.sessionStatus == ADAPTER_EVENTS.CONNECTED) {
      router.push('/dashboard');
    }
  }, [web3AuthProvider.sessionStatus])

  return (
    <LoadingIndicator />
  )
}