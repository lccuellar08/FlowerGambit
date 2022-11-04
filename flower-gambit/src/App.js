import {useState, useEffect} from 'react'
import Board from "./Board";

function App() {
  const [balance, setBalance] = useState(1000000)
  const [opponentBalance, setOpponentBalance] = useState(50000)

  useEffect(() => {
    try {
      const balanceStorage = localStorage.getItem('balance')
      if(balanceStorage !== undefined) {
        setBalance(JSON.parse(balanceStorage))
      }

      const opponentBalanceStorage = localStorage.getItem('opponentBalance')
      if(opponentBalanceStorage !== undefined) {
        setOpponentBalance(JSON.parse(opponentBalanceStorage))
      }
    } catch {

    }
    
  }, [])

  useEffect(() => {
    localStorage.setItem('balance', JSON.stringify(balance))
    localStorage.setItem('opponentBalance', JSON.stringify(opponentBalance))
  }, [balance, opponentBalance])

  return (
    <div className="App">
      <Board balance={balance} setBalance={setBalance} opponentBalance={opponentBalance} setOpponentBalance={setOpponentBalance}/>
    </div>
  );
}

export default App;
