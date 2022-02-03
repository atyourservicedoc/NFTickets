import { createContext } from "react"

// create context
// How to use (in other components):
// import { Web3AuthContext } from "___/Web3AuthContext";
// const web3Auth = useContext(Web3AuthContext)
export const Web3AuthContext = createContext();