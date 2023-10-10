import { ethers } from "ethers"
import Web3Modal from "web3modal"

import { NFTMarketplaceAddress, NFTMarketplaceAbi } from "../cotext/costants"

export const checkIfWalletConnected = async () => {
    if (typeof window.ethereum !== "undefined") {
        // Modern dapp browsers like MetaMask or Trust Wallet
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        try {
            // Request permission to access the user's accounts
            await window.ethereum.request({ method: "eth_requestAccounts" })

            // Check if the user is connected
            const accounts = await provider.listAccounts()

            if (accounts.length > 0) {
                const connectedAddress = accounts[0]
                console.log(
                    "Wallet is connected. Connected address:",
                    connectedAddress
                )
                return connectedAddress
            } else {
                console.log("Wallet is not connected.")
                return null
            }
        } catch (error) {
            console.error("Error connecting to wallet:", error)
            return null
        }
    } else {
        console.log("No Ethereum wallet detected.")
        return null
    }
}
export const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
        // Modern dapp browsers like MetaMask or Trust Wallet
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        try {
            // Request permission to access the user's accounts
            await window.ethereum.request({ method: "eth_requestAccounts" })

            // Check if the user is connected
            const accounts = await provider.listAccounts()

            if (accounts.length > 0) {
                const connectedAddress = accounts[0]
                console.log("Connected to wallet. Address:", connectedAddress)
                return connectedAddress
            } else {
                console.log("Wallet is not connected.")
                return null
            }
        } catch (error) {
            console.error("Error connecting to wallet:", error)
            return null
        }
    } else {
        console.log("No Ethereum wallet detected.")
        return null
    }
}

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        NFTMarketplaceAddress,
        NFTMarketplaceAbi,
        signerOrProvider
    )

export const connectingWithContract = async () => {
    try {
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        console.log("the abi", NFTMarketplaceAbi, typeof NFTMarketplaceAbi)
        const contract = fetchContract(signer)

        return contract
    } catch (error) {
        console.log(error)
    }
}
