import React, { useEffect, useState } from "react"

import { UserCard } from "../index"

const Helper = ({ account, functionName }) => {
    const [itemList, setItemList] = useState([])

    useEffect(() => {
        setItemList(functionName(account))
    })

    return (
        <div>
            <div class="mb-5">
                <div>
                    {itemList.map((item, index) => (
                        <div class="card-columns m-3">
                            <UserCard key={index + 1} item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Helper
