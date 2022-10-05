import { useState } from "react";
import Board from "../Board/Board.js";
import "../Style/Style.css";
import { calculateWinner } from "./calculateWinner.js";

function Game() {
	const defaultX = true;
	const defaultAsc = true;
	const defaultBoardSize = 5;
	const defaultStart = false;
	const defaultStep = 0;

	const [history, setHistory] = useState([
		{
			squares: Array(defaultBoardSize).fill(Array(defaultBoardSize).fill(null)),
			curPos: { row: null, col: null },
			countLeft: defaultBoardSize * defaultBoardSize,
		},
	]);
	const [stepNumber, setStepNumber] = useState(defaultStep);
	const [xIsNext, setXIsNext] = useState(defaultX);
	const [isAsc, setIsAsc] = useState(defaultAsc);
	const [isStart, setIsStart] = useState(defaultStart);
	const [boardSize, setboardSize] = useState(defaultBoardSize);
	const handleSquareClick = (row, col) => {
		if (!isStart) {
			return;
		}

		const currentHistory = history.slice(0, stepNumber + 1);
		const current = currentHistory[currentHistory.length - 1];
		const squares = current.squares.slice();
		const countLeft = current.countLeft;

		if (calculateWinner(current.squares, boardSize, current.curPos.row, current.curPos.col) ||
			squares[row][col])
			return;

		let item = squares.map((rows, i) => {
			return rows.map((cell, j) => {
				if (i === row && j === col) {
					return xIsNext ? "X" : "O";
				}
				return cell;
			});
		});

		setHistory((history) =>
			history.concat([
				{
					squares: item,
					curPos: { row, col },
					countLeft: countLeft - 1,
				},
			])
		);
		setStepNumber(history.length);
		setXIsNext((xIsNext) => !xIsNext);
	};

	const jumpTo = (step) => {
		setStepNumber(step);
		setXIsNext(step % 2 === 0);
	};

	const handleSort = () => {
		setIsAsc((isAsc) => !isAsc);
	};

	const boardSizeChange = (e) => {
		let value = e.target.value;
		setboardSize(value);
	};

	const handleStartGame = () => {
		if (isStart) {
			setHistory([
				{
					squares: Array(defaultBoardSize).fill(Array(defaultBoardSize).fill(null)),
					curPos: { row: null, col: null },
					countLeft: defaultBoardSize * defaultBoardSize,
				},
			]);
		} else {
			let customboardSize = parseInt(boardSize) || 0;
			customboardSize = customboardSize >= 0 ? customboardSize : 0;
			setboardSize(customboardSize);
			setHistory([
				{
					squares: Array(customboardSize).fill(
						Array(customboardSize).fill(null)
					),
					curPos: { row: null, col: null },
					countLeft: customboardSize * customboardSize,
				},
			]);
		}

		setXIsNext(defaultX);
		setStepNumber(0);
		setIsStart(!isStart);
	};

	const render = () => {
		const current = history[stepNumber];
		const winner = calculateWinner(
			current.squares,
			boardSize,
			current.curPos.row,
			current.curPos.col
		);
		const moves = history.map((step, move) => {
			const { row, col } = step.curPos;

			const desc = move
				? "MOVE: #" + move + ". COORDINATES = (" + (row + 1) + ", " + (col + 1) + ")" : "START HERE";
			return (
				<li key={move}>
					<button
						className={stepNumber === move ? "move move-current" : "move"}
						onClick={() => jumpTo(move)}>
						{desc}
					</button>
				</li>
			);
		});

		let winPos = undefined;

		let status;
		if (winner) {
			winPos = winner.positions;
			status = winner.winner + " WIN!!!";
		} else {
			if (current.countLeft === 0) {
				status = "END. DRAW!!";
				if (!isStart) {
					status = "";
				}
			} else {
				status = "NEXT TURN: " + (xIsNext ? "X" : "O");
			}
		}

		return (
			<div className="game">
				<div className="game-setup">
					<div className="game-board-size">
						<span>Board size: </span>
						<input className="game-board-size-input"
							readOnly={isStart}
							onChange={boardSizeChange}
							value={boardSize}
						/>
					</div>
					<div className="game-start">
						<button
							className="game-start-btn"
							onClick={handleStartGame}>
							{isStart ? "RESET" : "START"}
						</button>
					</div>
				</div>
				{isStart && (
					<div className="game-play-area">
						<div className="game-board">
							<Board
								squares={current.squares}
								boardSize={boardSize}
								winPos={winPos}
								curPos={current.curPos}
								onClick={(row, col) => {
									handleSquareClick(row, col);
								}}
							/>
						</div>
						<div className="game-move">
							<div className="game-sort">
								<div>
									<button className="sort-btn" onClick={handleSort}>
										SORT
									</button>
								</div>
								<div className="status">{status}</div>
							</div>
							<div className="move-history">
								<ol>{isAsc ? moves : moves.reverse()}</ol>
							</div>
						</div>

					</div>
				)}
			</div>
		);
	};

	return render();
}

export default Game;
