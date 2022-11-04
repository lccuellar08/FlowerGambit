import React, {useEffect, useState} from 'react'
import {FLOWER_COLOR} from './constants/flowers'
import {ReactComponent as FlowerSVG} from './flower-svgrepo-com.svg'

export default function Flower({id, setFlowers, flowers}) {
    const [flower, setFlower] = useState(flowers[id])

    useEffect(() => {
        setFlower(flowers[id])
    }, [flowers])

    function handleClick() {
        var rand = Math.floor(Math.random() * 9);
        console.log(Object.keys(FLOWER_COLOR))
        var randColorValue = FLOWER_COLOR[Object.keys(FLOWER_COLOR)[rand]];

        console.log(rand)
        console.log(randColorValue)

        const newFlower = {
            id: flower.id,
            bloomed: true,
            color: randColorValue
        }

        const newFlowers = flowers.slice()
        newFlowers[flower.id] = newFlower

        setFlower(newFlower)
        setFlowers(newFlowers)
    }

    if(flower.bloomed == true) {
        return (
            <div>
                <FlowerSVG className='flower-svg' fill={flower.color}/>
            </div>
        )
    } else {
        return (
            <div className='unbloomed-flower-div' onClick={() => handleClick()}>
                
            </div>
        )
    }
}
