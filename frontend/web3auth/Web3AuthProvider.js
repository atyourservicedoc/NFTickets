import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Web3AuthContext } from "./Web3AuthContext";
import { ADAPTER_EVENTS } from "@web3auth/base";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

// wrapper for the context to make main page cleaner
export default function Web3AuthProvider(props) {

    // setup states
    const [web3auth, setWeb3Auth] = useState();
    const [web3, setWeb3] = useState();
    const [ethersProvider, setEthersProvider] = useState();
    const [address, setAddress] = useState();
    const [userInfo, setUserInfo] = useState();
    const [sessionStatus, setSessionStatus] = useState('INIT');
    const [contractAbi, setContractAbi] = useState();

    // create web3auth object
    useEffect(async () => {

        const polygonMumbaiConfig = {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            rpcTarget: "https://rpc-mumbai.maticvigil.com",
            blockExplorer: "https://mumbai-explorer.matic.today",
            chainId: "0x13881",
            displayName: "Polygon Mumbai Testnet",
            ticker: "matic",
            tickerName: "matic",
        };

        const web3AuthInit = new Web3Auth({
            chainConfig: polygonMumbaiConfig,
            clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID
        })

        setWeb3Auth(web3AuthInit)

        web3AuthInit.initModal();

        // once connected, create web3 provider, get wallet address and other props
        web3AuthInit.on(ADAPTER_EVENTS.CONNECTED, async (data) => {

            // set session status
            setSessionStatus(ADAPTER_EVENTS.CONNECTED)

            // setup web3 provider
            const web3Init = new Web3(web3AuthInit.provider)
            setWeb3(web3Init)

            // setup ethers
            const ethersProviderInit = new ethers.providers.Web3Provider(web3AuthInit.provider)
            setEthersProvider(ethersProviderInit)

            // set wallet address
            web3Init.eth.getAccounts()
                .then(addresses => {
                    setAddress(addresses[0])
                })

            // get user info
            web3AuthInit.getUserInfo()
                .then(info => {
                    setUserInfo(info)
                })
        })

        // subsrcribe to other events
        web3AuthInit.on(ADAPTER_EVENTS.CONNECTING, () => {
            setSessionStatus(ADAPTER_EVENTS.CONNECTING)
        })

        web3AuthInit.on(ADAPTER_EVENTS.DISCONNECTED, () => {
            setSessionStatus(ADAPTER_EVENTS.DISCONNECTED)
        })

        web3AuthInit.on(ADAPTER_EVENTS.ERRORED, () => {
            setSessionStatus(ADAPTER_EVENTS.ERRORED)
        })

        //console.log(web3AuthInit.getUserInfo())
        //setSessionStatus('DONE_INIT')

        setTimeout(function () {
            if (!web3AuthInit.provider) {
                setSessionStatus(ADAPTER_EVENTS.DISCONNECTED);
            }
        }, 5000);
    }, [])

    return (
        <Web3AuthContext.Provider value={{ web3: web3, ethersProvider: ethersProvider, web3auth: web3auth, address: address, userInfo: userInfo, sessionStatus: sessionStatus }}>
            {props.children}
        </Web3AuthContext.Provider>
    )
}

//d
// go to dashboard while logged out -> 