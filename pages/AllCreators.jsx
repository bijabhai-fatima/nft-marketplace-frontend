import React, { useContext, useState, useEffect } from "react"

import { NFTMarketplaceContext } from "../cotext/NFTMarketplaceContext"
import { CreatorCard, RegisterCard } from "../components/index"
import Link from "next/link"

const AllCreators = () => {
    const { account, allCreators, registerd, calculateData, allNFTs } =
        useContext(NFTMarketplaceContext)

    useEffect(() => {
        if (account != "") {
            calculateData(account)
        }
        return
    }, [allNFTs, allCreators])

    return (
        <div class="container bg-light p-3">
            <div class="text-md-center mt-2 text-danger font-weight-bold">
                <p> Explore Creators</p>
            </div>
            <div class="container p-2">
                {account != "" ? !registerd ? <RegisterCard /> : "" : ""}
            </div>
            <div class="mb-5">
                <div>
                    {allCreators.map((item, index) => (
                        <Link
                            href={{
                                pathname: "/Creator",
                                query: {
                                    creatorAddress: item.creatorAddress,
                                },
                            }}
                            key={index + 1}
                        >
                            <div class="card-columns m-3">
                                <CreatorCard key={index + 1} item={item} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllCreators
