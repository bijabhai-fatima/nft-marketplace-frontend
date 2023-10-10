import React, { useContext, useEffect, useState } from "react"
import { NFTMarketplaceContext } from "../cotext/NFTMarketplaceContext"
import { UserCard } from "../components/index"
import { ethers } from "ethers"

const OwnedNFTs = () => {
    const { account, ownedNFTs, resellNFT, calculateData, allNFTs } =
        useContext(NFTMarketplaceContext)

    useEffect(() => {
        if (account != "") {
            calculateData(account)
        }
        return
    }, [allNFTs])

    const [model, setModel] = useState(false)
    const [price, setPrice] = useState()
    const [tokenId, setTokenId] = useState()
    return (
        <div class="container bg-light p-3">
            <div class="text-md-center mt-2 text-danger font-weight-bold">
                <p>Your Owned NFTs..</p>
            </div>
            <div class="mb-5">
                <div>
                    {ownedNFTs.map((item, index) => (
                        // <Link
                        //     href={{ pathname: "/NFT-details", query: item }}
                        //     key={index + 1}
                        // >
                        <div class="card-columns m-3">
                            <UserCard key={index + 1} item={item} />
                            <div>
                                <input
                                    type="text"
                                    placeholder={"the price"}
                                    onChange={(e) => {
                                        setPrice(
                                            ethers.utils.parseEther(
                                                e.target.value
                                            )
                                        ),
                                            setTokenId(item.tokenId)
                                    }}
                                    class="form-control"
                                />
                                <button
                                    class="btn btn-warning"
                                    onClick={() =>
                                        resellNFT({ tokenId, price })
                                    }
                                >
                                    Put For Resell
                                </button>
                                {typeof tokenId} {typeof price}
                            </div>
                        </div>
                        // </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OwnedNFTs
