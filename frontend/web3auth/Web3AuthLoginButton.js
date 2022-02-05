import { Web3AuthContext } from "./Web3AuthContext"
import { useContext, useEffect, useState } from "react"
import { ADAPTER_EVENTS } from "@web3auth/base";

export default function Web3AuthLoginButton() {

    const [menuOpen, setMenuOpen] = useState()
    const [loaded, setLoaded] = useState(false)

    // get web3auth context
    const web3AuthProvider = useContext(Web3AuthContext);

    useEffect(() => {
        if (!loaded) {
            setLoaded(web3AuthProvider.sessionStatus == ADAPTER_EVENTS.CONNECTED);
        }

        console.log(web3AuthProvider.sessionStatus)
    }, [web3AuthProvider.sessionStatus])

    return (
        <div className="flex justify-center transition-all">
            {
                <button className={`${ menuOpen ? 'mt-28' : 'mt-0' } absolute items-center justify-center w-60 h-10 rounded-full border-2 border-highlightD p-2 space-x-3 bg-accentD hover:scale-105 transition-all duration-300`}
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
            {
                <button className={`${ menuOpen ? 'mt-16' : 'mt-0' } absolute items-center justify-center w-60 h-10 rounded-full border-2 border-highlightD p-2 space-x-3 bg-accentD hover:scale-105 transition-all duration-300`}
                    onClick={async () => {
                        // go to my account page?
                    }}>
                        <p className="text-secondary font-bold">
                            My Account
                        </p>
                </button>
            }
            <button disabled={false} className="z-10 flex items-center justify-center w-64 h-14 rounded-full border-2 border-highlightD p-2 space-x-3 bg-accentD hover:scale-105 transition-all duration-300"
                onClick={async () => {
                    if (web3AuthProvider.sessionStatus != ADAPTER_EVENTS.CONNECTED) {
                        try {
                            await web3AuthProvider.web3auth.connect();
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        setMenuOpen(!menuOpen)
                    }
                }}>
                {
                    web3AuthProvider &&
                    <ProfilePhoto userInfo={web3AuthProvider.userInfo} sessionStatus={web3AuthProvider.sessionStatus} />
                }
                {
                    web3AuthProvider &&
                    <AccountLabel userInfo={web3AuthProvider.userInfo} address={web3AuthProvider.address} sessionStatus={web3AuthProvider.sessionStatus} />
                }
            </button>
        </div>
    )
}

function ProfilePhoto({ userInfo, sessionStatus }) {

    // Profile photo doesn't fill its container, also is off center
    // fix: scaled up and clipped to standard size
    return (
        <div className="aspect-square h-full rounded-full overflow-clip glow-white-xxs" >
            {
                sessionStatus != ADAPTER_EVENTS.DISCONNECTED && userInfo
                    ?
                    <img src={userInfo && userInfo.profileImage} className="scale-150" />
                    :
                    <div className={`bg-highlightD w-full h-full ${sessionStatus == ADAPTER_EVENTS.CONNECTING && "animate-pulse"}`} />
            }
        </div>
    )
}

function AccountLabel({ userInfo, address, sessionStatus }) {

    if (sessionStatus != ADAPTER_EVENTS.DISCONNECTED) {
        return (
            <div className="flex flex-col items-start grow justify-center pr-5">
                {
                    userInfo
                        ?
                        <p className="font-extrabold text-md text-accent glow-white-xxs" >
                            {userInfo.name}
                        </p>
                        :
                        <div className="w-24 h-3 bg-highlightD rounded-full animate-pulse" />
                }
                {
                    address
                        ?
                        <p className="font-bold w-40 text-xs text-secondary truncate text-ellipsis">
                            {address}
                        </p>
                        :
                        <div className="w-40 h-2 bg-highlightD rounded-full mt-2 animate-pulse" />
                }
            </div>
        )
    } else {
        return (
            <div className="flex flex-col items-start grow justify-center pr-5 font-extrabold text-md text-accent glow-white-xxs">
                Connect Account
            </div>
        )
    }
}