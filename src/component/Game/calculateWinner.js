function checkWinRow(squares, boardSize, row, col) {
	const positions = [{ row, col }];
	for (let i=0; i< boardSize; i++)
	{
		for (let j=0;j< boardSize-4; j++)
		{
			if (squares[i][j] && squares[i][j] === squares[i][j+1] &&
				squares[i][j] === squares[i][j+2] && squares[i][j] === squares[i][j+3]
				&& squares[i][j] === squares[i][j+4])
				{
					positions.push({ row: i, col: j });
					positions.push({ row: i, col: j+1 });
					positions.push({ row: i, col: j+2 });
					positions.push({ row: i, col: j+3 });
					positions.push({ row: i, col: j+4 });
					return positions;
				}
		}
	}
	return false;
}

function checkWinCol(squares, boardSize, row, col) {
	const positions = [{ row, col }];
	for (let i=0; i< boardSize-4; i++)
	{
		for (let j=0;j< boardSize; j++)
		{
			if (squares[i][j] && squares[i][j] === squares[i+1][j] &&
				squares[i][j] === squares[i+2][j] && squares[i][j] === squares[i+3][j]
				&& squares[i][j] === squares[i+4][j])
				{
					positions.push({ row: i, col: j });
					positions.push({ row: i+1, col: j });
					positions.push({ row: i+2, col: j });
					positions.push({ row: i+3, col: j });
					positions.push({ row: i+4, col: j });
					return positions;
				}
		}
	}
	return false;
}

function checkWinCrossRight(squares, boardSize, row, col) {
	const positions = [{ row, col }];
	for (let i=0; i< boardSize-4; i++)
	{
		for (let j=0;j< boardSize-4; j++)
		{
			if (squares[i][j] && squares[i][j] === squares[i+1][j+1] &&
				squares[i][j] === squares[i+2][j+2] && squares[i][j] === squares[i+3][j+3]
				&& squares[i][j] === squares[i+4][j+4])
				{
					positions.push({ row: i, col: j });
					positions.push({ row: i+1, col: j+1 });
					positions.push({ row: i+2, col: j+2 });
					positions.push({ row: i+3, col: j+3 });
					positions.push({ row: i+4, col: j+4 });
					return positions;
				}
		}
	}
	return false;
}

function checkWinCrossLeft(squares, boardSize, row, col) {
	const positions = [{ row, col }];
	for (let i=0; i< boardSize-4; i++)
	{
		for (let j=4;j< boardSize; j++)
		{
			if (squares[i][j] && squares[i][j] === squares[i+1][j-1] &&
				squares[i][j] === squares[i+2][j-2] && squares[i][j] === squares[i+3][j-3]
				&& squares[i][j] === squares[i+4][j-4])
				{
					positions.push({ row: i, col: j });
					positions.push({ row: i+1, col: j-1 });
					positions.push({ row: i+2, col: j-2 });
					positions.push({ row: i+3, col: j-3 });
					positions.push({ row: i+4, col: j-4 });
					return positions;
				}
		}
	}
	return false;
}

function calculateWinner(squares, boardSize, row, col) {
	if (row === null || col === null) {
		return false;
	}
	const positions = checkWinRow(squares, boardSize, row, col) ||
					checkWinCol(squares, boardSize, row, col) ||
					checkWinCrossRight(squares, boardSize, row, col) ||
					checkWinCrossLeft(squares, boardSize, row, col);

	if (positions)
	{
		const winner = squares[positions[0].row][positions[0].col];
		return {
			positions,
			winner,
		};
	}
	return false;
}

export { calculateWinner };
