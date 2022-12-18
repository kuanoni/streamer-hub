import Router from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { MoonLoader } from 'react-spinners';
import { keyframes, styled, theme } from 'stiches.config';

import { User } from '@globalTypes/custom-auth';

import Button from '../../../common/components/ui/Button';
import TextInput from '../../../common/components/ui/TextInput';
import { Label, List } from '../styles';

interface Props {
	user: User;
}

const Container = styled('div', {
	display: 'flex',
	gap: '1rem',
	width: '100%',
});

const moveIn = keyframes({
	'0%': {
		opacity: 0,
		transform: 'translateY(-2px)',
	},
	'100%': {
		opacity: 1,
		transform: 'translateY(0px)',
	},
});

const FeedbackContainer = styled('div', {
	position: 'absolute',
	bottom: 0,
	paddingTop: '1rem',
	color: theme.colors.textMedium,
	fontSize: '1rem',
	transform: 'translateY(100%)',
	'.title, li': {
		animation: `${moveIn} .2s`,
	},
});

const InputContainer = styled('div', {
	position: 'relative',
	minWidth: '65%',
	borderBottom: `1px solid ${theme.colors.grey400}`,
});

const fadeIn = keyframes({
	'0%': {
		opacity: 0.6,
	},
	'100%': {
		opacity: 1,
	},
});

const ButtonContainer = styled('div', {
	position: 'absolute',
	top: 0,
	right: 0,
	display: 'flex',
	height: '100%',
	padding: '.25rem',
	aspectRatio: 1,
	animation: `${fadeIn} .2s`,
});

type Response200 = { status: 200; available: boolean; validationErrors: string[] };
type Response500 = { status: 500; message: string };
type Response<T extends 200 | 500> = T extends 200 ? Response200 : Response500;

const checkDisplayName = async (name: string): Promise<Response<200 | 500>> =>
	await fetch(`/api/db/checkDisplayName?displayName=${name}`).then((res) => res.json());

const setDisplayName = async (id: string, name: string) =>
	await fetch('/api/db/userSetDisplayName', {
		method: 'PATCH',
		body: JSON.stringify({ _id: id, displayName: name }),
	}).then((res) => res.json());

const DisplayNameInput = ({ user }: Props) => {
	const [displayNameValue, setDisplayNameValue] = useState('');
	const [debouncedDisplayName, setDebouncedDisplayName] = useState('');
	const [feedback, setFeedback] = useState<string[]>([]);
	const [isNameAvailable, setIsNameAvailable] = useState(false);

	const hasFeedback = feedback.length !== 0;

	// debounce validateDisplayName when displayNameValue changes
	useEffect(() => {
		const debounceTimeout = setTimeout(() => {
			validateDisplayName(displayNameValue);
			setDebouncedDisplayName(displayNameValue);
		}, 800);

		return () => {
			clearTimeout(debounceTimeout);
		};
	}, [displayNameValue]);

	const validateDisplayName = async (name: string) => {
		const newFeedback: string[] = [];

		// if input is empty, remove all feedback
		if (name === '') {
			setIsNameAvailable(false);
			return setFeedback([]);
		}

		// spaces must be replaced to be sent as a URL query
		const res = await checkDisplayName(name.replaceAll(' ', '%20'));

		// retry fetching if failed

		if (res.status === 200) {
			if (res.validationErrors) setFeedback([...newFeedback, ...res.validationErrors]);
			setIsNameAvailable(res.available);
		}

		if (res.status === 500) {
			console.log(res);
			setFeedback(['There is a problem with the server right now. Please try again later.']);
		}
	};

	const renderFeedback = useMemo(() => {
		if (isNameAvailable) return <Label className='title'>That username is available!</Label>;
		if (hasFeedback)
			return (
				<>
					<Label className='title'>Unfortunately, that username...</Label>
					<List>
						{feedback.map((item) => (
							<li key={item}>{item}</li>
						))}
					</List>
				</>
			);
		else return <></>;
	}, [feedback, hasFeedback, isNameAvailable]);

	const submitDisplayName = async () => {
		if (!isNameAvailable) return;

		// SET DISPLAY NAME
		const setDisplayNameResponse = await setDisplayName(user.id, debouncedDisplayName);
		if (setDisplayNameResponse.status === 200) Router.reload();
		if (setDisplayNameResponse.status === 500)
			return setFeedback(['There is a problem with the server right now. Please try again later.']);
	};

	const handleInputChange = (val: string) => {
		setDisplayNameValue(val);
		setIsNameAvailable(false);
	};

	return (
		<Container>
			<InputContainer>
				<TextInput
					value={displayNameValue}
					setValue={handleInputChange}
					placeholder={'Enter username...'}
					autoFocus
					maxLength={15}
					color='transparent'
					size='huge'
				/>
				{isNameAvailable && (
					<ButtonContainer>
						<Button content='icon' size='fill' onClick={submitDisplayName}>
							<BsFillHandThumbsUpFill />
						</Button>
					</ButtonContainer>
				)}
				{false && (
					<ButtonContainer>
						<MoonLoader color={theme.colors.textLight.toString()} loading={true} size={30} />
					</ButtonContainer>
				)}
			</InputContainer>
			<FeedbackContainer>
				<Label className='title'>Your username must be...</Label>
				<List>
					<li>Be at least 5 characters long</li>
					<li>Be at most 15 characters long</li>
					<li>{'Have no special characters (!?-.@&$) or spaces'}</li>
					<li>{'Have no bad words'}</li>
				</List>
				{renderFeedback}
			</FeedbackContainer>
		</Container>
	);
};

export default DisplayNameInput;
