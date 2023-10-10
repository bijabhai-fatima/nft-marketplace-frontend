import { useContext } from "react"
const axios = require("axios")
const FormData = require("form-data")
require("dotenv").config()

export const pinFileToIPFS = async (file, name) => {
    try {
        const formData = new FormData()

        formData.append("file", file)

        const pinataMetadata = JSON.stringify({
            name: name,
        })

        formData.append("pinataMetadata", pinataMetadata)

        const pinataOptions = JSON.stringify({
            cidVersion: 0,
        })
        formData.append("pinataOptions", pinataOptions)

        const res = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
                headers: {
                    pinata_api_key: "your pinata api key",
                    pinata_secret_api_key: "your secret api key",
                    "Content-Type": "multipart/form-data",
                },
            }
        )
        console.log(res.data)
        console.log(
            `View the file here: https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
        )

        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const testAuthentication = () => {
    console.log("authntication")
    const options = {
        method: "GET",
        headers: {
            pinata_api_key: "ed46d423943cb8c65541",
            pinata_secret_api_key:
                "07afcc7473dfd1e837b74954379d616ee42afaa656de68ef0ae4ea750c8c6188",
        },
    }

    fetch("https://api.pinata.cloud/data/testAuthentication", options)
        .then((response) => response.json())
        .then((response) => console.log(response.message))
        .catch((err) => console.error(err))
}
