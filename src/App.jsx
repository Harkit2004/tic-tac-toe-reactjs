import { useEffect, useState } from 'react'
import { TurnProvider } from './context/turnContext'
import Box from './components/Box'

function App() {
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState("");
  const [board, setBoard] = useState(() => {
    let b = [];
    for (let i = 0; i < 9; i++) {
      b.push({
        id: i,
        current: ""
      });
    }
    return b;
  });

  const checkWinner = () => {
    let check = "X";
    for (let i = 0 ; i < 2; i++) {
      if (i == 1) {
        check = "O";
      }
      if ((board[0].current == check && board[1].current == check && board[2].current == check) ||
        (board[3].current == check && board[4].current == check && board[5].current == check) ||
        (board[6].current == check && board[7].current == check && board[8].current == check) ||
        (board[0].current == check && board[3].current == check && board[6].current == check) ||
        (board[1].current == check && board[4].current == check && board[7].current == check) ||
        (board[2].current == check && board[5].current == check && board[8].current == check) ||
        (board[0].current == check && board[4].current == check && board[8].current == check) ||
        (board[2].current == check && board[4].current == check && board[6].current == check)) {
        return check;
      }
    }
    let val = 0;
    board.forEach((box) => {
      if (box.current == "") {
        val++;
      }
    })
    if (val == 0) {
      return "D";
    }
    return "";
  };

  useEffect(() => {
    if (checkWinner() != "") {
      setWinner(checkWinner());
    }
  }, [turn])

  return (
    <TurnProvider value={{turn, setBoard, setTurn}}>
      <div className='flex flex-wrap flex-col justify-center gap-2 '>
        <div className="flex flex-wrap flex-row m-3 p-3 justify-center">
          <div className='grid grid-cols-3 grid-rows-3 justify-center place-content-around gap-1'>
            { winner==""?
              board.map((box) => <Box key={box.id} id={box.id}/>):""
            }
          </div>
        </div>
        {winner != ""?
        <div className='flex flex-wrap flex-col gap-3'>
          <div className='flex flex-wrap flex-row justify-center'>
            {winner == "D"?
            <div role="alert" className="alert alert-warning w-1/4 h-3/4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>Draw</span>
            </div>
            : 
            <div role="alert" className="alert alert-success  w-1/4 h-3/4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Winner is {winner}</span>
            </div>
            }
          </div>
          <div className='flex flex-wrap flex-row justify-center'>
            <button className="btn btn-info w-1/4" onClick={() => location.reload()}>Reset</button>
          </div>
        </div>
        : ""
        }
      </div>
    </TurnProvider>
  )
}

export default App
