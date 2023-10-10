import React, { useContext, useEffect } from "react"

import { NFTMarketplaceContext } from "../cotext/NFTMarketplaceContext"
import { UserCard } from "../components/index"
import Link from "next/link"

const AllNFTs = () => {
    const { account, allNFTs, calculateData } = useContext(
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
                <p>Explore and Purchase</p>
            </div>
            <div class="mb-5">
                <div>
                    {allNFTs.map((item, index) => (
                        <Link
                            href={{
                                pathname: "/NFT-details",
                                query: {
                                    tokenId: item.tokenId.toNumber(),
                                },
                            }}
                            key={index + 1}
                        >
                            <div class="card-columns m-3">
                                {!item.sold ? (
                                    <UserCard key={index + 1} item={item} />
                                ) : (
                                    ""
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllNFTs
