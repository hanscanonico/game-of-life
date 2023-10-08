import React from "react"
import "./Square.css"

interface SquareProps {
  x: number
  y: number
  isAlive: boolean
}

export const Square: React.FC<SquareProps> = ({ x, y, isAlive }) => {
  const classNames = isAlive ? "square alive" : "square"

  return <span className={classNames}></span>
}
