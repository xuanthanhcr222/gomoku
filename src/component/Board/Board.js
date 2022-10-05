import Square from "../Square/Square.js";

import "../Style/Style.css";

function Board({squares, boardSize, winPos, curPos, onClick}) {
	const handleClick = (i, k) => {
		return () => onClick(i, k);
	};
	const render = () => {
		let board = [];
		for (let row = 0; row < boardSize; row++) {
			let lists = [];
			for (let col = 0; col < boardSize; col++) {
				let isWinSqr;
				if (winPos) {
					isWinSqr = winPos.some((pos) => {
						return pos.row === row && pos.col === col;
					});
				}

				lists.push(
					<Square
						value={squares[row][col]}
						isWinSqr={isWinSqr}
						isCurPos={curPos.row === row && curPos.col === col}
						onClick={handleClick(row, col)}
						key={col}
					/>
				);
			}
			board.push(
				<div key={row} className="board-row">
					{lists}
				</div>
			);
		}
		return board;
	};

	return <>{render()}</>;
}

export default Board;
