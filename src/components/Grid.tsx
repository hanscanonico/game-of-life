import React from "react"
import { Square } from "./Square"
import "./Grid.css"

interface GridProps {
  squareStates: boolean[][]
  gridStyle: React.CSSProperties
  toogleSquare: (x: number, y: number) => void
}

export const Grid: React.FC<GridProps> = ({
  squareStates,
  gridStyle,
  toogleSquare,
}) => {
  const grid = squareStates.flatMap((row, i) =>
    row.map((cell, j) => (
      <Square
        key={`${i}-${j}`}
        x={i}
        y={j}
        isAlive={cell}
        toogleSquare={toogleSquare}
      />
    ))
  )

  return (
    <div className="grid" style={gridStyle}>
      {grid}
    </div>
  )
}
