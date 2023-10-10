import React, { useContext, useState, useEffect } from "react"

import { NFTMarketplaceContext } from "../cotext/NFTMarketplaceContext"
import { InputCard } from "../components/index"
import { ethers } from "ethers"
import AllCreators from "./AllCreators"

const Profile = () => {
    const {
        account,
        registerd,
        balance,
        withdrawFunds,
        calculateData,
        allNFTs,
        allCreators,
    } = useContext(NFTMarketplaceContext)

    useEffect(() => {
        if (account != "") {
            calculateData(account)
        }
        return
    }, [allNFTs, allCreators])

    return (
        <div class="container bg-light p-3 border border-info">
            {account != "" ? (
                <div>
                    <div class="text-md-center mt-2 text-danger font-weight-bold">
                        {registerd ? (
                            <div class="container bg-light p-3">
                                <InputCard />
                            </div>
                        ) : (
                            "Register as a creator inorder to create NFTs"
                        )}
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">Your Balace: </h3>
                            <div class="bg-secondary mt-2 p-1 border">
                                <p class="card-text font-weight-bold text-light">
                                    {balance
                                        ? ethers.utils.formatEther(
                                              balance.toString()
                                          )
                                        : ""}
                                </p>
                            </div>
                            <p>
                                {balance ? (
                                    <button
                                        class="btn btn-danger"
                                        onClick={() => withdrawFunds()}
                                    >
                                        WITHDREW
                                    </button>
                                ) : (
                                    ""
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    )
}

export default Profile
