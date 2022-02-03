import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Web3AuthContext } from "./Web3AuthContext";

// wrapper for the context to make main page cleaner
export default function Web3AuthProvider(props) {

    const web3auth = new Web3Auth({
        chainConfig: { chainNamespace: CHAIN_NAMESPACES.EIP155 },
        clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID
    })

    return (
        <Web3AuthContext.Provider value={web3auth}>
            {props.children}
        </Web3AuthContext.Provider>
    )
}