import React from "react"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { BigNumber, ethers } from "ethers"

import {
    checkIfWalletConnected,
    connectWallet,
    connectingWithContract,
} from "../Utils/apiFeature"

export const NFTMarketplaceContext = React.createContext()

export const NFTMarketplaceProvider = ({ children }) => {
    const title = "Welcome to NFTMarketplace"

    //usestate
    const [account, setAccount] = useState("")
    const [allNFTs, setAllNFTs] = useState([])
    const [createdNFTs, setCreatedNFTs] = useState([])
    const [ownedNFTs, setOwnedNFTs] = useState([])
    const [allCreators, setAllCreators] = useState([])
    const [registerd, setRegisterd] = useState(false)
    const [balance, setBalance] = useState()
    const [nftCount, setNftCount] = useState()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    //need to redirect for chating
    const router = useRouter()

    //connect walatte
    const _connectWallet = async () => {
        console.log("connecting...")
        const connectedAccount = await connectWallet()
        setAccount(connectedAccount)
    }

    //FETCH DATA
    const fetchData = async () => {
        try {
            setLoading(true)
            console.log("fetching..", account)
            //get contract
            const contract = await connectingWithContract()
            //get account
            // const connectAccount = await connectWallet()
            // setAccount(connectAccount)
            //get all nfts
            const allNFTs = await contract.getAllNFTs()
            setAllNFTs(allNFTs)
            console.log("all NFTs here..", allNFTs)
            const allCreators = await contract.getAllCreators()
            setAllCreators(allCreators)
            console.log("all creators here..", allCreators)
            const getBalance = await contract.getBalance()
            setBalance(getBalance)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    const calculateData = async (account) => {
        try {
            console.log("Calculating Data...")
            // console.log("registerd...", checkIfAlreadyCreator(account))
            const getRegisterd = checkIfAlreadyCreator(account)
            setRegisterd(getRegisterd)
            console.log("if registerd", registerd)
            const _getCreatedNFTs = getCreatedNFTs(account)
            setCreatedNFTs(_getCreatedNFTs)
            const _getOwnedNFTs = getOwnedNFTs(account)
            setOwnedNFTs(_getOwnedNFTs)
            console.log("created nfts", createdNFTs)
            console.log("owned nfts", ownedNFTs)
            if (allNFTs) {
                setNftCount(allNFTs.length)
            } else {
                setNftCount(0)
            }
            console.log("total nfts", nftCount)
        } catch (error) {
            console.log(error)
        }
    }
    //wheneever the page is loaded fetchData will execute
    useEffect(() => {
        fetchData()
        console.log("done fetching data...")
        // if (account != "") {
        //     calculateData(account)
        // }
        return
    }, [loading])

    //create NFT
    const createNFT = async ({ uri, price }) => {
        try {
            //get contract
            const contract = await connectingWithContract()
            if (checkIfAlreadyCreator(account)) {
                const createMyNFT = await contract.createNFT(uri, price)
                setLoading(true)
                await createMyNFT.wait()
                setLoading(false)
                router.push("/")
                window.location.reload()
            } else {
                setError("First Be a Creator")
            }
        } catch (error) {
            // setError(error)
            console.log(error)
        }
    }

    //add creater
    const addCreater = async (name) => {
        try {
            const contract = await connectingWithContract()
            const addCreater = await contract.addCreater(name)
            setLoading(true)
            await addCreater.wait()
            setLoading(false)
            router.push("/")
            window.location.reload()
        } catch (error) {
            setError(error)
        }
    }

    //purchase
    const purchaseNFT = async ({ tokenId, price }) => {
        try {
            const contract = await connectingWithContract()
            const nft = _getMarketItem(tokenId)
            console.log(tokenId, price)
            let buyNFT
            if (nft.creator == nft.lastSeller) {
                buyNFT = await contract.purchaseNFT(
                    ethers.BigNumber.from(tokenId),
                    {
                        value: price,
                    }
                )
            } else {
                buyNFT = await contract.rePurchaseNFT(
                    ethers.BigNumber.from(tokenId),
                    {
                        value: price,
                    }
                )
            }

            setLoading(true)
            await buyNFT.wait()
            setLoading(false)
            router.push("/")
            window.location.reload()

            // const purchaseNFT = await contract.purchaseNFT(tokenId, {
            //     value: price,
            // })
            // setLoading(true)
            // await purchaseNFT.wait()
            // setLoading(false)
            // router.push("/")
            // window.location.reload()
        } catch (error) {
            setError(error)
        }
    }

    const getCreatorDetails = (creatorAddress) => {
        let i = 0
        console.log("inside getCreatorDEtails", creatorAddress)
        while (i < allCreators.length) {
            console.log(allCreators[i])
            if (allCreators[i].creatorAddress == creatorAddress) {
                return allCreators[i]
            }
            i++
        }
        return
    }

    const _getMarketItem = (tokenId) => {
        let i = 0
        console.log("In _getMarketItem")
        // console.log(typeof tokenId, typeof allNFTs[0].tokenId.toString())
        // console.log(typeof ethers.BigNumber.from(tokenId))
        while (i < allNFTs.length) {
            if (allNFTs[i].tokenId.toString() == tokenId) {
                console.log("inside if..", allNFTs[i])
                return allNFTs[i]
            }
            i++
        }
        return
    }
    //put for resell
    const resellNFT = async ({ tokenId, price }) => {
        try {
            const contract = await connectingWithContract()
            const putForResell = await contract.resellNFT(tokenId, price)
            setLoading(true)
            await putForResell.wait()
            setLoading(false)
            router.push("/")
            window.location.reload()
        } catch (error) {
            setError(error)
        }
    }

    //withdrawFunds
    const withdrawFunds = async () => {
        try {
            const contract = await connectingWithContract()
            const getWithdrawFunds = await contract.withdrawFunds()
            setLoading(true)
            await getWithdrawFunds.wait()
            setLoading(false)
            router.push("/")
            window.location.reload()
            console.log("withdrewFunds retuns..", getWithdrawFunds)
        } catch (error) {
            setError(error)
        }
    }

    //check if creator
    const checkIfAlreadyCreator = (address) => {
        let i = 0
        while (i < allCreators.length) {
            if (allCreators[i].creatorAddress == address) {
                return true
            }
            i++
        }

        return false
    }

    //get NFTs of prticuler creator
    const getCreatedNFTs = (creatorAddress) => {
        console.log("In getCreatedNFTs", creatorAddress)
        let createdNFTs = []
        let i = 0
        while (i < allNFTs.length) {
            if (allNFTs[i].creator == creatorAddress) {
                createdNFTs.push(allNFTs[i])
            }
            i++
        }

        return createdNFTs
    }

    //get owned NFTs
    const getOwnedNFTs = (address) => {
        let ownedNFTs = []
        let i = 0
        while (i < allNFTs.length) {
            console.log(allNFTs[i].owner)
            if (allNFTs[i].owner == address) {
                ownedNFTs.push(allNFTs[i])
            }
            i++
        }

        return ownedNFTs
    }

    return (
        <NFTMarketplaceContext.Provider
            value={{
                title,
                account,
                balance,
                allNFTs,
                createdNFTs,
                ownedNFTs,
                allCreators,
                addCreater,
                withdrawFunds,
                registerd,
                nftCount,
                error,
                loading,
                connectWallet,
                _connectWallet,
                checkIfWalletConnected,
                connectingWithContract,
                createNFT,
                purchaseNFT,
                calculateData,
                getCreatedNFTs,
                getOwnedNFTs,
                getCreatorDetails,
                _getMarketItem,
                checkIfAlreadyCreator,
                resellNFT,
                setAccount,
            }}
        >
            {children}
        </NFTMarketplaceContext.Provider>
    )
}
