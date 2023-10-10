import React from "react"
import { useState, useEffect, useContext } from "react"
import { Error } from "../index"
import "bootstrap/dist/css/bootstrap.css"

import { NFTMarketplaceContext } from "../../cotext/NFTMarketplaceContext"
import { testAuthentication } from "../../Utils/pinFileToIPFS"
import Link from "next/link"
import { connectWallet } from "../../Utils/apiFeature"

const NavBar = () => {
    const menuItems = [
        {
            menu: "All NFTs",
            link: "/AllNFTs",
            forAll: true,
        },
        {
            menu: "All Creators",
            link: "/AllCreators",
            forAll: true,
        },
        {
            menu: "Created NFTs",
            link: "/CreatedNFTs",
            forAll: false,
        },
        {
            menu: "Owned NFTs",
            link: "/OwnedNFTs",
            forAll: false,
        },
        {
            menu: "Profile",
            link: "/Profile",
            forAll: false,
        },
    ]

    //SHOW ACTIVE ACCOUNT
    const [active, setActive] = useState(0)
    const { account, title, error, _connectWallet, setAccount, connectWallet } =
        useContext(NFTMarketplaceContext)

    const handleClick = (index) => {
        setActive(index)
    }
    const handle = () => {
        console.log("handle called..")
        _connectWallet()
    }
    return (
        <div class="container">
            {/* NavBar */}
            <div class="navbar bg-light m-2 rounded-sm">
                <div className="navbar-brand m-3">
                    <h2>NFTMarketplace</h2>
                </div>
                <div class="navbar nav">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                handleClick(index)
                            }}
                            class={
                                index === active
                                    ? "nav-item-active ml-3"
                                    : "nav-link"
                            }
                        >
                            <Link href={item.link} class="cursor-pointer">
                                <div class="text-uppercase text-xl-center ">
                                    {item.menu}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                {/* CONNECT WALLATE */}
                <div class="nav m-3">
                    <button
                        onClick={() => handle()}
                        className="btn btn-primary"
                    >
                        {account == "" ? "Connect Wallet" : account}
                    </button>
                </div>
                {/* <div>
                    <Error error={error} />
                </div> */}
            </div>
        </div>
    )
}

export default NavBar
