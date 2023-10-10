import React, { useContext, useState, useEffect } from "react"

import { NFTMarketplaceContext } from "../cotext/NFTMarketplaceContext"
import { UserCard } from "../components/index"

const CreatedNFTs = () => {
    const { account, createdNFTs, calculateData, allNFTs } = useContext(
        NFTMarketplaceContext
    )

    useEffect(() => {
        if (account != "") {
            calculateData(account)
        }
        return
    }, [allNFTs])

    return (
        <div class="container bg-light p-3">
            <div class="text-md-center mt-2 text-danger font-weight-bold">
                <p>Your Created NFTs</p>
            </div>
            <div class="mb-5">
                <div>
                    {createdNFTs.map((item, index) => (
                        <div class="card-columns m-3">
                            <UserCard key={index + 1} item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CreatedNFTs
