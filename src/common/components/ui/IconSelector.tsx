import React, { useCallback, useMemo, useState } from 'react';
import { styled, theme } from 'stiches.config';

const buttonSize = 36;
const containerGap = 8;

const Container = styled('div', {
	visibility: 'hidden',
	position: 'relative',
	backgroundColor: theme.colors.primary900,
	borderRadius: theme.space.borderRad,
});

const Button = styled('button', {
	display: 'inline-flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: buttonSize,
	height: buttonSize,
	padding: 0,
	color: theme.colors.textMedium,
	backgroundColor: 'transparent',
	border: 'none',
	borderRadius: theme.space.borderRad,
	zIndex: 1,
	cursor: 'pointer',
	variants: {
		selected: {
			true: {
				color: `${theme.colors.textLightActive} !important`,
			},
		},
	},
	'&:not(:last-child)': {
		marginRight: containerGap,
	},
	'&:hover': {
		color: theme.colors.grey300,
	},
	svg: {
		width: '50%',
		height: '50%',
		zIndex: 1,
	},
});

const Highlighter = styled('div', {
	position: 'absolute',
	top: 0,
	width: buttonSize,
	height: buttonSize,
	backgroundColor: theme.colors.secondary900,
	borderRadius: theme.space.borderRad,
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

	const selectChoice = useCallback(
		(choice: string) => {
			setSelected(choice);
			onSelect(choice);
		},
		[setSelected, onSelect]
	);

	const choiceButtons = useMemo(() => {
		return Object.keys(choices).map((key) => {
			return (
				<Button key={key} selected={key === selected} onClick={() => selectChoice(key)}>
					{choices[key]}
				</Button>
			);
		});
	}, [choices, selected, selectChoice]);

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
