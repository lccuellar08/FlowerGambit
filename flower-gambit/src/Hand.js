import React, {useEffect, useState} from 'react'
import Flower from './Flower'
import {HAND_NAMES} from './constants/hands'


export default function Hand({highestHand, setHighestHand}) {
    
    const [flowers, setFlowers] = useState([
        {
            id: 0,
            bloomed: false,
            color: null
        },
        {
            id: 1,
            bloomed: false,
            color: null
        },
        {
            id: 2,
            bloomed: false,
            color: null
        },
        {
            id: 3,
            bloomed: false,
            color: null
        },
        {
            id: 4,
            bloomed: false,
            color: null
        }])

    useEffect(() => {
        // Check if all flowers bloomed
        var allBloomed = true
        flowers.forEach((flower) => {
            allBloomed &= flower.bloomed
        })

        if(allBloomed) {
            checkHand()
        } else {
            // Do nothing
        }

    }, [flowers])

    useEffect(() => {
        if(highestHand === null) {
            console.log("resetting flowers")
            setFlowers([
                {
                    id: 0,
                    bloomed: false,
                    color: null
                },
                {
                    id: 1,
                    bloomed: false,
                    color: null
                },
                {
                    id: 2,
                    bloomed: false,
                    color: null
                },
                {
                    id: 3,
                    bloomed: false,
                    color: null
                },
                {
                    id: 4,
                    bloomed: false,
                    color: null
                }])
        }
    }, [highestHand])

    function checkHand() {
        const flowerCounts = {
            RED: 0,
            BLUE: 0,
            GREEN: 0,
            BLACK: 0,
            WHITE: 0,
            CYAN: 0,
            YELLOW: 0,
            PURPLE: 0,
            ORANGE: 0
        }

        flowers.forEach((flower) => {
            flowerCounts[flower.color] += 1
        })

        console.log(flowerCounts)

        if(flowerCounts.RED == 5 || flowerCounts.BLUE == 5 || flowerCounts.GREEN == 5 || flowerCounts.BLACK == 5 || flowerCounts.WHITE == 5 ||
            flowerCounts.CYAN == 5 || flowerCounts.YELLOW == 5 || flowerCounts.PURPLE == 5 || flowerCounts.ORANGE == 5) {
            setHighestHand(HAND_NAMES.FIVE_OF_A_KIND)
        } else if(flowerCounts.RED == 4 || flowerCounts.BLUE == 4 || flowerCounts.GREEN == 4 || flowerCounts.BLACK == 4 || flowerCounts.WHITE == 4 ||
            flowerCounts.CYAN == 4 || flowerCounts.YELLOW == 4 || flowerCounts.PURPLE == 4 || flowerCounts.ORANGE == 4) {
            setHighestHand(HAND_NAMES.FOUR_OF_A_KIND)
        } else if(flowerCounts.RED == 3 || flowerCounts.BLUE == 3 || flowerCounts.GREEN == 3 || flowerCounts.BLACK == 3 || flowerCounts.WHITE == 3 ||
            flowerCounts.CYAN == 3 || flowerCounts.YELLOW == 3 || flowerCounts.PURPLE == 3 || flowerCounts.ORANGE == 3) {
            if(flowerCounts.RED == 2 || flowerCounts.BLUE == 2 || flowerCounts.GREEN == 2 || flowerCounts.BLACK == 2 || flowerCounts.WHITE == 2 ||
                flowerCounts.CYAN == 2 || flowerCounts.YELLOW == 2 || flowerCounts.PURPLE == 2 || flowerCounts.ORANGE == 2) {
                setHighestHand(HAND_NAMES.FULL_HOUSE) 
            } else {
                setHighestHand(HAND_NAMES.THREE_OF_A_KIND)
            }
        } else if(flowerCounts.RED == 2 || flowerCounts.BLUE == 2 || flowerCounts.GREEN == 2 || flowerCounts.BLACK == 2 || flowerCounts.WHITE == 2 ||
            flowerCounts.CYAN == 2 || flowerCounts.YELLOW == 2 || flowerCounts.PURPLE == 2 || flowerCounts.ORANGE == 2) {
            var numberOfPairs = 0
            Object.values(flowerCounts).forEach((flowerCount) => {
                if(flowerCount == 2) {
                    numberOfPairs += 1
                }
            })
            if(numberOfPairs == 2) {
                setHighestHand(HAND_NAMES.TWO_PAIRS)
            }
            else  {
                setHighestHand(HAND_NAMES.ONE_PAIR)
            }
        } else {
            setHighestHand(HAND_NAMES.TRASH)
        }
    }


    return (
        <div className='hand-div'>
            <div className='hand-name-div'>
                {Object.keys(HAND_NAMES)[highestHand]}
            </div>
            {flowers.map((flower) => {
                return (<div className='flower-div' key={flower.id}>
                    <Flower key={flower.id} id={flower.id} setFlowers={setFlowers} flowers={flowers} />
                </div>)
            })}
        </div>
    )
}
