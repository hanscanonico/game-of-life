import React from "react"
import "./Square.css"

interface SquareProps {
  x: number
  y: number
  isAlive: boolean
  toogleSquare: (x: number, y: number) => void
}

export const Square: React.FC<SquareProps> = ({
  x,
  y,
  isAlive,
  toogleSquare,
}) => {
  const classNames = isAlive ? "square alive" : "square"

  return <span className={classNames} onClick={() => toogleSquare(x, y)}></span>
}
