import React, { useContext, useState } from "react"
import { pinFileToIPFS } from "../../Utils/pinFileToIPFS"
import { NFTMarketplaceContext } from "../../cotext/NFTMarketplaceContext"

const useUpload = () => {
    const [ipfsHash, setIpfsHash] = useState("")
    const [uploading, setUploading] = useState(false)
    const [nftGrafic, setNftGrafic] = useState()

    const { nftCount } = useContext(NFTMarketplaceContext)

    const handleSubmit = async (nftGrafic) => {
        setUploading(true)
        console.log("uploading.....")
        setIpfsHash(
            (await pinFileToIPFS(nftGrafic, (nftCount + 1).toString())).IpfsHash
        )
        setUploading(false)
    }
    return {
        ipfsHash,
        render: (
            <div class=" ">
                <input
                    type="file"
                    placeholder="Upload NFT Grafic"
                    onChange={(e) => setNftGrafic(e.target.files[0])}
                    class="form-control"
                />
                <button
                    onClick={() => handleSubmit(nftGrafic)}
                    class="btn btn-primary m-3"
                    disabled={uploading}
                >
                    {uploading ? "is Uploading" : "Upload"}
                </button>
            </div>
        ),
    }
}

export default useUpload
