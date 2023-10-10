import React, { useContext, useState, useEffect } from "react"
import { NFTMarketplaceContext } from "../../cotext/NFTMarketplaceContext"
import { ethers } from "ethers"

const UserCard = ({ key, item }) => {
    const { purchaseNFT } = useContext(NFTMarketplaceContext)
    const uri = `https://cyan-civic-cow-717.mypinata.cloud/ipfs/${item.tokenURI}`
    const tokenId = item.tokenId
    const price = item.price
    return (
        <div class="card">
            <div class="card-body">
                <h3 class="card-title">tokenId: {item.tokenId.toNumber()}</h3>
                <p class="card-text">creater: {item.creator}</p>
                <p class="card-text">Seller: {item.lastSeller}</p>
                <div>
                    <img src={uri} alt={uri} height="200" width="200" />
                </div>
                <h2 class="card-text">
                    Price: {ethers.utils.formatEther(item.price)}
                </h2>
                {/* <button
                    class="btn btn-primary"
                    onClick={() => purchaseNFT({ tokenId, price })}
                >
                    purchase
                </button> */}
            </div>
        </div>
    )
}

export default UserCard
