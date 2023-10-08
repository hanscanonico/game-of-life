import React, { useEffect } from "react"
import { Square } from "./Square"
import "./Grid.css"

interface GridProps {
  nbRows: number
  nbColumns: number
  start: boolean
  reset: boolean
  setSquareStates: React.Dispatch<React.SetStateAction<boolean[][]>>
  squareStates: boolean[][]
}

export const Grid: React.FC<GridProps> = ({
  nbRows,
  nbColumns,
  start,
  reset,
  setSquareStates,
  squareStates,
}) => {
  const gridStyle = {
    gridTemplateColumns: `repeat(${nbColumns}, 30px)`,
  }

  const grid = squareStates.flatMap((row, i) =>
    row.map((cell, j) => (
      <Square key={`${i}-${j}`} x={i} y={j} isAlive={cell} />
    ))
  )

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        const newSquareStates = squareStates.map((row) => [...row])
        for (let i = 0; i < nbRows; i++) {
          for (let j = 0; j < nbColumns; j++) {
            const nbAliveNeighbors = [
              squareStates[i - 1]?.[j - 1],
              squareStates[i - 1]?.[j],
              squareStates[i - 1]?.[j + 1],
              squareStates[i]?.[j - 1],
              squareStates[i]?.[j + 1],
              squareStates[i + 1]?.[j - 1],
              squareStates[i + 1]?.[j],
              squareStates[i + 1]?.[j + 1],
            ].filter(Boolean).length

            if (squareStates[i][j]) {
              if (nbAliveNeighbors < 2 || nbAliveNeighbors > 3) {
                newSquareStates[i][j] = false
              }
            } else {
              if (nbAliveNeighbors === 3) {
                newSquareStates[i][j] = true
              }
            }
          }
        }
        setSquareStates(newSquareStates)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [start, squareStates, nbRows, nbColumns, reset, setSquareStates])

  return (
    <div className="grid" style={gridStyle}>
      {grid}
    </div>
  )
}
