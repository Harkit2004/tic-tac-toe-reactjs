import { createContext, useContext } from "react";

const TurnContext = createContext({
    turn: "X",
    setTurn: () => {},
    setBoard: () => {}
});

export const TurnProvider = TurnContext.Provider

export default function useTurn() {
    return useContext(TurnContext);
}