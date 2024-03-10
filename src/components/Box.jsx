import React, { useState } from 'react'
import useTurn from '../context/turnContext';

function Box({id}) {
    const [current, setCurrent] = useState("");
    const [changeAble, setChangeAble] = useState(true);
    const {turn, setTurn, setBoard} = useTurn();

    const changeCurrent = () => {
        setBoard((prevBoard) => prevBoard.map((box) => box.id == id?{...box, current: turn}: box));
        setChangeAble(false);
        setCurrent(turn);
        if (turn == "X") {
            setTurn("O");
        } else {
            setTurn("X");
        }
    };

  return (
    <div id={id} className="grid grid-cols-1 p-4 w-32 h-32 rounded-md bg-slate-700 text-white place-content-center" onClick={() => (changeAble?changeCurrent():"")}>
        <h1 className="flex flex-wrap flex-row justify-center text-3xl">{current}</h1>
    </div>
  )
}

export default Box