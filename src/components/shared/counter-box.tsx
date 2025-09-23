import { useState } from "react";

const boxes = [
	[1, 1, 1],
	[1, 0, 1],
	[1, 1, 1],
];

const CounterBox = () => {
	const allBoxes = boxes.flat();
	const [selectedBox, setSelectedBox] = useState<Array<number>>([]);

	const handleOnClick = (index: number) => {
		if (selectedBox.indexOf(index) >= 0) return;
		const newValue = [...selectedBox, index];
		setSelectedBox(newValue);
		if (newValue.length === allBoxes.filter(v => v).length) {
			onAllBoxesSelected();
		}
	};

	const onAllBoxesSelected = () => {
		const interval = setInterval(() => {
			setSelectedBox(currentValue => {
				const newValue = [...currentValue];
				const popValue = newValue.shift();

				if (popValue === undefined) clearInterval(interval);
				return popValue === undefined ? [] : newValue;
			});
		}, 300);
	};

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${boxes[0].length},1fr)`,
				gap: "12px",
			}}
		>
			{allBoxes.map((value, i) => (
				<div
					className={`${
						value == 1 ? "border border-primary" : "pointer-events-none"
					} ${
						selectedBox.indexOf(i) < 0 ? "bg-none" : "bg-primary"
					} size-[100px] transition-[background]`}
					key={i}
					onClick={() => {
						if (value === 0) return;
						handleOnClick(i);
					}}
				></div>
			))}
		</div>
	);
};

export default CounterBox;
