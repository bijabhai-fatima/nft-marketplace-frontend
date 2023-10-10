import "../styles/globals.css"
import { NFTMarketplaceProvider } from "../cotext/NFTMarketplaceContext"
import { NavBar } from "../components/index"
import "bootstrap/dist/css/bootstrap.css"

import React, { useState } from "react"

// import {
//     pinFileToIPFS,
//     sayHello,
//     testAuthentication,
// } from "../Utils/pinFileToIPFS"

import { pinFileToIPFS } from "../Utils/pinFileToIPFS"

function MyApp({ Component, pageProps }) {
    const [data, setData] = useState({})

    const [nftGrafic, setNftGrafic] = useState()
    const [uploading, setUploading] = useState(false)

    const handleSubmit = async (nftGrafic) => {
        setUploading(true)
        console.log("uploading.....")
        setData(await pinFileToIPFS(nftGrafic))
        setUploading(false)
    }
    return (
        <div class="container p-2">
            <NFTMarketplaceProvider>
                <NavBar />
                <Component {...pageProps} />
            </NFTMarketplaceProvider>
        </div>
    )
}

export default MyApp
