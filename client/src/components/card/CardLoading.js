import React from 'react'
import { Skeleton, Card } from "antd";
const CardLoading = ({ count }) => {
    const LoopCard = () => {
        let cards = []
        for (let i = 0; i < count; i++) {
            cards.push(<Card>
                <Skeleton />
            </Card>)
        }
        return cards
    }
    return (
        <>
            <div className='col mb-5'>
                {LoopCard()}
            </div>
        </>
    )
}

export default CardLoading