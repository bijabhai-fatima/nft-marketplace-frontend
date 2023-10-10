import React, { useContext, useState } from "react"

import { NFTMarketplaceContext } from "../../cotext/NFTMarketplaceContext"
import { ethers } from "ethers"
import useUpload from "../Upload/useUpload"

const InputCard = () => {
    const { account, createNFT, handleSubmit } = useContext(
        NFTMarketplaceContext
    )

    const { render, ipfsHash } = useUpload()

    const [price, setPrice] = useState(0)
    const [uri, setUri] = useState()

    const handleCreate = () => {
        setUri(ipfsHash)
        createNFT({ uri, price })
    }

    return (
        <div>
            <div class="container bg-light p-3 border border-info">
                <div>
                    <p class="font-weight-bolder">Add New NFT</p>
                    <div class="input-group">
                        <input
                            type="text"
                            placeholder={uri}
                            class="form-control"
                            disabled
                        />
                        <div class="form-control">{render}</div>
                        <input
                            type="text"
                            placeholder={"the price"}
                            onChange={(e) =>
                                setPrice(
                                    ethers.utils.parseEther(e.target.value)
                                )
                            }
                            class="form-control"
                        />
                    </div>
                    <div class="container p-2">
                        {/* <button
                            onClick={async () =>
                                setUri(await pinFileToIPFS(nftGrafic))
                            }
                            class="btn btn-primary mr-3"
                        >
                            Upload
                        </button> */}
                        <button
                            onClick={() => {
                                handleCreate()
                            }}
                            class="btn btn-primary mr-3"
                        >
                            Create
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            class="btn btn-danger m-3"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputCard
