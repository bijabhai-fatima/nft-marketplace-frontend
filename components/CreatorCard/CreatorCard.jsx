import React from "react"

export const CreatorCard = ({ key, item }) => {
    return (
        <div>
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Creator Name: {item.name}</h3>
                    <p class="card-text">
                        Creater Address: {item.creatorAddress}
                    </p>
                    <p class="card-text">
                        Item Created: {item.ItemCount.toNumber()}
                    </p>
                    <p class="card-text">
                        Totl sales (including resells) :
                        {item.totalSells.toNumber()}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CreatorCard
