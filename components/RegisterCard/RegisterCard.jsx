import React, { useContext, useState } from "react"

import { NFTMarketplaceContext } from "../../cotext/NFTMarketplaceContext"

const RegisterCard = () => {
    const { account, addCreater } = useContext(NFTMarketplaceContext)
    const [name, setName] = useState("")
    const [openModel, setOpenModel] = useState(true)
    return (
        <div>
            <div class="container bg-light p-3 border border-info">
                {openModel && (
                    <div>
                        <p class="font-weight-bolder"> </p>
                        <div class="input-group">
                            <input
                                type="text"
                                placeholder="Enter Name"
                                onChange={(e) => setName(e.target.value)}
                                class="form-control"
                            />

                            <input
                                type="text"
                                placeholder={account}
                                class="form-control"
                                disabled
                            />
                        </div>
                        <div class="container p-2">
                            <button
                                onClick={() => addCreater(name)}
                                class="btn btn-primary mr-3"
                            >
                                Register
                            </button>
                            <button
                                onClick={() => setOpenModel(false)}
                                class="btn btn-danger m-3"
                            >
                                Cancle
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RegisterCard
