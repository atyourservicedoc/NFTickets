import { Web3AuthContext } from "./Web3AuthContext"
import { useContext, useEffect, useState } from "react"
import { ADAPTER_EVENTS } from "@web3auth/base";
import { useRouter } from "next/router";
import makeBlockie from 'ethereum-blockies-base64';

// Designed to redirect to another page
export default function Web3AuthLoginButton() {

    // get web3auth context
    const web3AuthProvider = useContext(Web3AuthContext);

    // use router
    const router = useRouter();

    return (
        <button disabled={false} className="z-10 flex items-center justify-center w-64 h-14 rounded-2xl p-2 space-x-3 bg-accentD hover:scale-105 transition-all duration-300"
            onClick={async () => {
                if (web3AuthProvider.sessionStatus != ADAPTER_EVENTS.CONNECTED) {
                    try {
                        await web3AuthProvider.web3auth.connect();
                        router.push('/dashboard');
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    router.push('/dashboard');
                }
            }}>
            <div className="flex justify-center font-extrabold text-md text-accent glow-pink-xs animate-pulse">
                {web3AuthProvider.sessionStatus != ADAPTER_EVENTS.CONNECTED ? 'Connect Wallet' : 'Go to Dashboard'}
            </div>
        </button>
    )
}

// Designed to simply display login info and provide logout functionality (located in top right of dashboard)
export function Web3AuthAccountIndicator() {

    const [menuOpen, setMenuOpen] = useState()
    const [loaded, setLoaded] = useState(false)
    const [balance, setBalance] = useState(0);

    // get web3auth context
    const web3AuthProvider = useContext(Web3AuthContext);

    // use router
    const router = useRouter();

    useEffect(() => {
        if (!loaded) {
            setLoaded(web3AuthProvider.sessionStatus == ADAPTER_EVENTS.CONNECTED);
        }
    }, [web3AuthProvider.sessionStatus])

    useEffect(async () => {
        if (web3AuthProvider.web3 && web3AuthProvider.address) {
            // subscribe to account balance
            web3AuthProvider.web3.eth.getBalance(web3AuthProvider.address)
                .then((b) => {
                    setBalance(web3AuthProvider.web3.utils.fromWei(b, 'ether'))
                })
        }
    }, [web3AuthProvider.address])

    return (
        <div className="flex justify-center transition-all">
            {
                <button className={`${menuOpen ? 'mt-16' : 'mt-0'} absolute items-center justify-center w-60 h-10 rounded-full border-2 border-highlightD p-2 space-x-3 bg-accentD hover:scale-105 transition-all duration-300`}
                    onClick={async () => {
                        try {
                            await web3AuthProvider.web3auth.logout();
                            setMenuOpen(false)
                        } catch (e) {
                            console.log(e);
                        }
                    }}>
                    <p className="text-red-500 font-bold">
                        Log out
                    </p>
                </button>
            }
            <button disabled={false} className="z-10 flex items-center justify-center w-[20rem] h-14 rounded-full border-2 border-highlightD p-2 space-x-3 bg-accentD hover:scale-105 transition-all duration-300"
                onClick={() => {
                    if (loaded) {
                        setMenuOpen(!menuOpen)
                    }
                }}>
                {
                    web3AuthProvider &&
                    <ProfilePhoto userInfo={web3AuthProvider.userInfo} address={web3AuthProvider.address} sessionStatus={web3AuthProvider.sessionStatus} />
                }
                {
                    web3AuthProvider &&
                    <AccountLabel userInfo={web3AuthProvider.userInfo} address={web3AuthProvider.address} sessionStatus={web3AuthProvider.sessionStatus} />
                }
                <p className="flex items-center h-full w-16 overflow-clip whitespace-nowrap text-accent font-black text-xl">
                    {balance}
                </p>
            </button>
        </div>
    )
}

function ProfilePhoto({ userInfo, address, sessionStatus }) {

    // Profile photo doesn't fill its container, also is off center
    // fix: scaled up and clipped to standard size
    if (sessionStatus != ADAPTER_EVENTS.DISCONNECTED && userInfo && address) {
        return (
            <div className="aspect-square h-full rounded-full overflow-clip glow-white-xxs" >
                {
                    userInfo.name
                    ?
                    <img src={userInfo.profileImage} className="scale-150" />
                    :
                    <img src={makeBlockie(address)}/>
                }
            </div>
        )
    } else {
        return (
            <div className="bg-highlightD w-full h-full animate-pulse" />
        )
    }
}

function AccountLabel({ userInfo, address, sessionStatus }) {
    return (
        <div className="flex flex-col items-start grow justify-center pr-5">
            {
                sessionStatus != ADAPTER_EVENTS.DISCONNECTED && userInfo
                    ?
                    <p className="font-extrabold text-md text-accent glow-white-xxs" >
                        {userInfo.name}
                    </p>
                    :
                    <div className="w-24 h-3 bg-highlightD rounded-full animate-pulse" />
            }
            {
                sessionStatus != ADAPTER_EVENTS.DISCONNECTED && address
                    ?
                    <p className="font-bold w-40 text-xs text-secondary truncate text-ellipsis">
                        {address}
                    </p>
                    :
                    <div className="w-40 h-2 bg-highlightD rounded-full mt-2 animate-pulse" />
            }
        </div>
    )
}

//sessionStatus != ADAPTER_EVENTS.DISCONNECTED