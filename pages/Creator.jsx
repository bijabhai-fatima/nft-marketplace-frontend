import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"

import { NFTMarketplaceContext } from "../cotext/NFTMarketplaceContext"
import { ethers } from "ethers"
import { CreatorCard, UserCard } from "../components/index"

const Creator = () => {
    const { getCreatedNFTs, getCreatorDetails, allNFTs, allCreators } =
        useContext(NFTMarketplaceContext)

    const [creatorDetails, setCreatorDetails] = useState()
    const [creatorAddress, setCreatorAddress] = useState("")
    const [createdNFTs, setCreatedNFTs] = useState([])
    const [status, setStatus] = useState(false)

    const router = useRouter()

    useEffect(() => {
        if (router.isReady) {
            setCreatorDetails(() =>
                getCreatorDetails(router.query.creatorAddress)
            ),
                setCreatedNFTs(() =>
                    getCreatedNFTs(router.query.creatorAddress)
                ),
                setCreatorAddress(router.query.creatorAddress),
                setStatus(true)
        }
        return
    }, [allNFTs, allCreators])
    return (
        <div>
            <div class="card">
                <div class="card-body">
                    {status ? (
                        <div>
                            <div class="text-md-center mt-2 text-danger font-weight-bold">
                                <h3>This is creator details page..</h3>
                                <CreatorCard key="" item={creatorDetails} />
                            </div>
                            <div class="text-md-center mt-2 text-danger font-weight-bold">
                                <h3>All the created NFTs..</h3>
                            </div>
                            <div class="mb-5">
                                <div>
                                    {createdNFTs.map((item, index) => (
                                        <div class="card-columns m-3">
                                            <UserCard
                                                key={index + 1}
                                                item={item}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    )
}

export default Creator
