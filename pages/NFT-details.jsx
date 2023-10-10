import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"

import { NFTMarketplaceContext } from "../cotext/NFTMarketplaceContext"
import { ethers } from "ethers"

const NFTdetails = () => {
    const { purchaseNFT, _getMarketItem, allNFTs } = useContext(
        NFTMarketplaceContext
    )

    const [nftDetails, setNftDetails] = useState()
    const [nftUri, setNftUri] = useState("")
    const [tokenId, setTokenId] = useState("")
    const [price, setPrice] = useState()
    const [status, setStatus] = useState(false)

    const router = useRouter()

    useEffect(() => {
        if (router.isReady) {
            setNftDetails(() => _getMarketItem(router.query.tokenId)),
                setTokenId(router.query.tokenId),
                setStatus(true)
        }
        return
    }, [allNFTs])

    return (
        <div>
            <div class="card">
                <div class="card-body">
                    {status ? (
                        <div onLoad={() => setPrice(nftDetails.price)}>
                            <h3 class="card-title">
                                tokenId: {nftDetails.tokenId.toNumber()}
                            </h3>
                            <p class="card-text">
                                creater: {nftDetails.creator}
                            </p>
                            <p class="card-text">
                                Seller: {nftDetails.lastSeller}
                            </p>
                            <div>
                                <img
                                    src={`https://cyan-civic-cow-717.mypinata.cloud/ipfs/${nftDetails.tokenURI}`}
                                    alt={nftUri}
                                    height="400"
                                    width="400"
                                />
                            </div>
                            <h2 class="card-text">
                                Price:{" "}
                                {ethers.utils.formatEther(nftDetails.price)}
                            </h2>
                            <button
                                class="btn btn-primary"
                                onClick={() => purchaseNFT({ tokenId, price })}
                            >
                                purchase
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    )
}

export default NFTdetails
