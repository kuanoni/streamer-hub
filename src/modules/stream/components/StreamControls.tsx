import React, { FC } from 'react';
import { BsFacebook, BsTwitch, BsYoutube } from 'react-icons/bs';
import { styled } from 'stiches.config';
import IconSelector from '../../../common/components/new/IconSelector';

const Container = styled('div', {
	display: 'flex',
	alignItems: 'center',
	padding: '.5rem',
	paddingRight: '2rem',
	width: '100%',
});

const StreamTitle = styled('h1', {
	display: 'inline',
	margin: 0,
	marginLeft: 'auto',
	fontSize: '2rem',
});

const StreamRuntime = styled('div', {
	alignSelf: 'end',
	marginLeft: '.5rem',
	color: '$textDarker',
});

interface Props {
	streamSource: string;
	setStreamSource: (newSource: string) => void;
}

const StreamControls: FC<Props> = ({ streamSource, setStreamSource }) => {
	return (
		<Container>
			<IconSelector
				choices={{
					twitch: <BsTwitch />,
					youtube: <BsYoutube />,
					facebook: <BsFacebook />,
				}}
				defaultChoice={streamSource}
				onSelect={setStreamSource}
			/>
			<StreamTitle>time to go over everything...</StreamTitle>
			<StreamRuntime>02:02:12</StreamRuntime>
		</Container>
	);
};

export default StreamControls;
