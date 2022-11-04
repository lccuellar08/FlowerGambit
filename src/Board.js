import React, {useState, useEffect} from 'react'
import Hand from './Hand'
import { HAND_NAMES } from './constants/hands'

export default function Board({balance, setBalance, opponentBalance, setOpponentBalance}) {
    const [hand1, setHand1] = useState(null)
    const [hand2, setHand2] = useState(null)
    const [bet, setBet] = useState(0)
    const [winner, setWinner] = useState()

    useEffect(() => {
        if(hand1 !== null && hand2 !== null) {
            if(hand1 < hand2) {
                setWinner("player1")
            } else if(hand1 > hand2) {
                setWinner("player2")
            } else {
                setWinner("draw")
            }
        }
    }, [hand1, hand2])

    useEffect(() => {
        if(winner === "player1") {
            setBalance(balance + bet)
            setOpponentBalance(opponentBalance - bet)
        } else if (winner === "player2") {
            setBalance(balance - bet)
            setOpponentBalance(opponentBalance + bet)
        } else {
            setBalance(balance)
            setOpponentBalance(opponentBalance)
        }
    }, [winner])

    function resetGame() {
        setHand1(null)
        setHand2(null)
        setWinner(undefined)
    }

    return (
        <div>
            <h1>Board</h1>
            Bet: <div>
                    <input type={'number'} value={bet} onChange={(e) => setBet(parseInt(e.target.value))}/>
                </div>
            <div className='winner-div'>
                {winner !== undefined ? `${winner} wins! `: ""}
            </div>
            <div>
                <button onClick={() => resetGame()}>New Game</button>
            </div>
            <div>
                <h3>Player 1</h3>
                <div>
                    <h2>Balance: {balance}</h2>
                </div>
                <Hand highestHand={hand1} setHighestHand={setHand1}/>
            </div>
            <br />
            <br />
            <div>
                <h3>Player 2</h3>
                <div>
                    <h2>Balance: {opponentBalance}</h2>
                </div>
                <Hand highestHand={hand2} setHighestHand={setHand2}/>
            </div>
        </div>
    )
}
