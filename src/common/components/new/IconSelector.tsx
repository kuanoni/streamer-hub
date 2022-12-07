import React, { useMemo, useState } from 'react';
import { styled } from 'stiches.config';

const containerGap = 8;

const Container = styled('div', {
	position: 'relative',
	display: 'flex',
	gap: containerGap,
	backgroundColor: '$cover',
	borderRadius: 10,
});

const Button = styled('button', {
	display: 'inline-flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: 36,
	height: 36,
	padding: 0,
	color: '$textDarker',
	backgroundColor: 'transparent',
	border: 'none',
	borderRadius: 10,
	zIndex: 1,
	cursor: 'pointer',
	variants: {
		selected: {
			true: {
				color: '$primary',
			},
		},
	},
	'&:hover': {
		color: '$textDarkerHighlighted',
	},
	svg: {
		width: '50%',
		height: '50%',
	},
});

const Highlighter = styled('div', {
	position: 'absolute',
	top: 0,
	width: 36,
	height: 36,
	backgroundColor: '$action',
	borderRadius: 10,
	transformOrigin: 'center',
	transition: '.1s ease',
});

const IconSelector = ({
	choices,
	defaultChoice,
	onSelect,
}: {
	choices: { [index: string]: React.ReactNode };
	defaultChoice: string;
	onSelect: Function;
}) => {
	const [selected, setSelected] = useState(defaultChoice);

	const selectChoice = (choice: string) => {
		setSelected(choice);
		onSelect(choice);
	};

	const choiceButtons = useMemo(() => {
		return Object.keys(choices).map((key) => {
			return (
				<Button key={key} selected={key === selected} onClick={() => selectChoice(key)}>
					{choices[key]}
				</Button>
			);
		});
	}, [choices, selected]);

	const SelectionHighlighter = useMemo(() => {
		const choicesArr = Object.keys(choices);
		const selectedIndex = choicesArr.findIndex((choice) => choice === selected);

		const highlighterPosition = (selectedIndex / choicesArr.length) * 100 + '%';
		const gapOffset = (selectedIndex / choicesArr.length) * containerGap + 'px';

		return <Highlighter css={{ left: `calc(${highlighterPosition} + ${gapOffset})` }} />;
	}, [choices, selected]);

	return (
		<Container>
			{SelectionHighlighter}
			{choiceButtons}
		</Container>
	);
};

export default IconSelector;
