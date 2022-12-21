import { User } from 'next-auth';
import { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { BsHandThumbsUpFill } from 'react-icons/bs';
import { MoonLoader } from 'react-spinners';
import { keyframes, styled, theme } from 'stiches.config';

import Button from '@components/ui/Button';
import TextInput from '@components/ui/TextInput';
import reloadAuthSession from '@utils/reloadAuthSession';

import { Label, List } from '../styles';

const fadeIn = keyframes({
	'0%': {
		opacity: 0.6,
	},
	'100%': {
		opacity: 1,
	},
});

const Form = styled('form', {
	position: 'relative',
	display: 'flex',
	alignItems: 'end',
	padding: '.5rem 1rem',
	backgroundColor: theme.colors.primary900,
});

const InputContainer = styled('div', {
	position: 'relative',
	'& > input': {
		paddingRight: '4rem',
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
	button: {
		animation: `${fadeIn} .2s`,
	},
});

const FeedbackContainer = styled('div', {
	padding: '0 1rem',
	transition: 'max-height .2s ease',
	overflow: 'hidden',
});

type SuccessResponse = { status: 200; available: boolean; validationErrors: string[] };
type ErrorResponse = { status: 500; message: string };
type Response<T extends number> = T extends 200 ? SuccessResponse : ErrorResponse;

const checkUsername = async (name: string): Promise<Response<200 | 500>> =>
	await fetch(`/api/db/checkUsername?username=${name}`).then((res) => res.json());

const setUsername = async (id: string, name: string) =>
	await fetch('/api/db/setUsername', {
		method: 'PATCH',
		body: JSON.stringify({ _id: id, username: name }),
	}).then((res) => res.json());

interface Props {
	user: User;
}

const UsernameInput = ({ user }: Props) => {
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isNameAvailable, setIsNameAvailable] = useState(false);
	const [validationFeedback, setValidationFeedback] = useState<string[]>([]);
	const feedbackContainerRef = useRef<HTMLDivElement>(null);

	const hasFeedback = validationFeedback.length !== 0;

	// attempt to set username using an API call
	const submitUsername: MouseEventHandler<HTMLButtonElement> = async (e) => {
		e.preventDefault();
		if (!isNameAvailable) return;
		setIsLoading(true);
		setIsNameAvailable(false);

		const res = await setUsername(user.id, inputValue);

		if (res.status === 200) reloadAuthSession();
		if (res.status === 500)
			return setValidationFeedback(['There is a problem with the server right now. Please try again later.']);

		setIsLoading(false);
	};

	// populates validationFeedback using an API call
	const setDebouncedFeedback = useCallback(() => {
		if (inputValue === '') {
			setValidationFeedback([]);
			setIsLoading(false);
			return;
		}

		checkUsername(inputValue).then((result) => {
			setIsLoading(false);

			if (result.status === 200)
				if (result.available) {
					setIsNameAvailable(true);
					setValidationFeedback([]);
				} else setValidationFeedback(result.validationErrors);
		});
	}, [inputValue, setValidationFeedback, setIsLoading]);

	// start debounce timeout when inputValue changes
	useEffect(() => {
		setIsLoading(true);
		setIsNameAvailable(false);

		const debounceTimeout = setTimeout(setDebouncedFeedback, 800);
		return () => clearTimeout(debounceTimeout);
	}, [inputValue, setDebouncedFeedback, setIsLoading, setIsNameAvailable]);

	// animate container height when valiadtionFeedback changes
	useEffect(() => {
		if (!feedbackContainerRef.current) return;
		const container = feedbackContainerRef.current;

		container.style.height = 'auto';
		container.style.maxHeight = `${container.scrollHeight}px`;
		container.style.height = '9999px';
	}, [validationFeedback]);

	return (
		<>
			<Form>
				<InputContainer>
					<TextInput
						value={inputValue}
						setValue={setInputValue}
						placeholder={'Enter username...'}
						autoFocus
						maxLength={15}
						color='transparent'
						size='huge'
					/>
					<ButtonContainer>
						{isLoading ? (
							<MoonLoader color={theme.colors.textLight.toString()} loading={true} size={30} />
						) : null}
						{isNameAvailable ? (
							<Button content='icon' size='fill' onClick={submitUsername}>
								<BsHandThumbsUpFill />
							</Button>
						) : null}
					</ButtonContainer>
				</InputContainer>
			</Form>
			<FeedbackContainer ref={feedbackContainerRef}>
				<Label weight='bold'>Your username must be...</Label>
				<List>
					<li>Be at least 5 characters long</li>
					<li>Be at most 15 characters long</li>
					<li>Have no special characters [!?-.@&$] or spaces</li>
					<li>Have no bad words</li>
				</List>
				{hasFeedback ? (
					<>
						<Label color='error' weight='bold'>
							That username...
						</Label>
						<List color='error'>
							{validationFeedback.map((item) => (
								<li key={item}>{item}</li>
							))}
						</List>
					</>
				) : null}
			</FeedbackContainer>
		</>
	);
};

export default UsernameInput;
