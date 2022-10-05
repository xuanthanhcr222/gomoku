import "../Style/Style.css";

function Square({ value, isWinSqr, isCurPos, onClick, key }) {
	const render = () => {
		let class1 = isWinSqr ? "winner" : "";
		let class2 = isCurPos ? "current-position" : "";
		let classFinal = `square ${class1} ${class2}`;

		return (
			<button className={classFinal} onClick={onClick}>
				{value}
			</button>
		);
	};

	return render();
}

export default Square;