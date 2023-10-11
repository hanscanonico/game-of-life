import { Grid } from "./Grid"
import "./GameCenter.css"
import { useCallback, useEffect, useState } from "react"

export const GameCenter = () => {
  const [start, setStart] = useState<boolean>(false)
  const [nbRows, setNbRows] = useState<number>(20)
  const [nbColumns, setNbColumns] = useState<number>(20)
  const [speed, setSpeed] = useState<number>(1000)
  const [zoom, setZoom] = useState(1)
  const [inputRows, setInputRows] = useState<number>(20)
  const [inputColumns, setInputColumns] = useState<number>(20)
  const [gridStyle, setGridStyle] = useState<React.CSSProperties>({
    gridTemplateColumns: `repeat(${nbColumns}, 30px)`,
  })

  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(parseFloat(event.target.value))
  }

  const createInitialSquareStates = useCallback(
    (nbRows: number, nbColumns: number): boolean[][] => {
      return Array.from({ length: nbRows }).map(() =>
        Array.from({ length: nbColumns }).map(() => Math.random() > 0.8)
      )
    },
    []
  )

  const [squareStates, setSquareStates] = useState<boolean[][]>(
    createInitialSquareStates(nbRows, nbColumns)
  )

  const handleInputRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputRows(parseInt(e.target.value))
  }

  const handleInputColumnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColumns(parseInt(e.target.value))
  }

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(e.target.value))
  }

  const startGame = () => {
    setStart(true)
  }

  const resetGame = () => {
    setNbColumns(inputColumns)
    setNbRows(inputRows)
    setStart(false)
    setGridStyle({
      gridTemplateColumns: `repeat(${inputColumns}, 30px)`,
    })
    setSquareStates(createInitialSquareStates(inputRows, inputColumns))
  }

  const toogleSquare = (x: number, y: number) => {
    const newSquareStates = squareStates.map((row) => [...row])
    newSquareStates[x][y] = !newSquareStates[x][y]
    setSquareStates(newSquareStates)
  }

  const updateGame = useCallback(() => {
    if (start) {
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
    }
  }, [start, squareStates, nbRows, nbColumns])

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        updateGame()
      }, speed)

      return () => clearInterval(interval)
    }
  }, [start, speed, updateGame])

  return (
    <div>
      <div>
        <h1>Conway's Game of Life</h1>
        <div
          style={{
            transform: `scale(${zoom})`,
            transition: "transform 0.1s",
            transformOrigin: "top",
          }}
        >
          <Grid
            squareStates={squareStates}
            gridStyle={gridStyle}
            toogleSquare={toogleSquare}
          />
        </div>
      </div>
      <div className="button-container">
        <button className="start" onClick={startGame}>
          Start
        </button>
        <button className="stop" onClick={() => setStart(false)}>
          Stop
        </button>
        <button className="reset" onClick={resetGame}>
          Reset
        </button>
      </div>
      <div className="input-container">
        <span>Number of rows</span>
        <input type="text" value={inputRows} onChange={handleInputRowsChange} />
        <span>Number of columns</span>
        <input
          type="text"
          value={inputColumns}
          onChange={handleInputColumnsChange}
        />
        <span>Speed (in ms)</span>
        <input type="text" onChange={handleSpeedChange} value={speed} />
        <span>Zoom</span>
        <input
          type="range"
          min="0.2"
          max="2"
          step="0.1"
          value={zoom}
          onChange={handleZoomChange}
        />
      </div>
    </div>
  )
}
