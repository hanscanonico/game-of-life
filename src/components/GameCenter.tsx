import { Grid } from "./Grid"
import "./GameCenter.css"
import { useCallback, useState } from "react"

export const GameCenter = () => {
  const nbColumns = 20
  const nbRows = 20

  const [start, setStart] = useState<boolean>(false)
  const [reset, setReset] = useState<boolean>(false)
  const createInitialSquareStates = useCallback(
    (): boolean[][] =>
      Array.from({ length: nbRows }).map(() =>
        Array.from({ length: nbColumns }).map(() => Math.random() > 0.8)
      ),
    [nbRows, nbColumns]
  )

  const [squareStates, setSquareStates] = useState<boolean[][]>(
    createInitialSquareStates
  )

  console.log("squareStates", squareStates)

  const resetGame = () => {
    setReset(false)
    setSquareStates(createInitialSquareStates())
    setStart(false)
  }

  return (
    <div>
      <h1>Conway's Game of Life</h1>
      <Grid
        nbRows={nbRows}
        nbColumns={nbColumns}
        start={start}
        reset={reset}
        squareStates={squareStates}
        setSquareStates={setSquareStates}
      />
      <div className="button-container">
        <button className="start" onClick={() => setStart(true)}>
          Start
        </button>
        <button className="stop" onClick={() => setStart(false)}>
          Stop
        </button>
        <button className="reset" onClick={resetGame}>
          Reset
        </button>
      </div>
    </div>
  )
}
