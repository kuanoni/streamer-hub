import { useCallback, useEffect, useState } from 'react';
import { BsHandThumbsUpFill } from 'react-icons/bs';
import { MoonLoader } from 'react-spinners';
import { keyframes, styled, theme } from 'stiches.config';

import Button from '@components/ui/Button';
import TextInput from '@components/ui/TextInput';
import { User } from '@globalTypes/custom-auth';

import { Label, List } from '../styles';

const Form = styled('form', {
	position: 'relative',
	display: 'flex',
	alignItems: 'end',
	padding: '.5rem 1rem',
	backgroundColor: theme.colors.primary900,
	'& > input': {
		minWidth: '10ch',
		maxWidth: '65%',
		paddingRight: '4rem',
	},
});

const InputContainer = styled('div', {
	position: 'relative',
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

const FeedbackContainer = styled('div', {
	padding: '1rem',
});

type Response200 = { status: 200; available: boolean; validationErrors: string[] };
type Response500 = { status: 500; message: string };
type Response<T extends 200 | 500> = T extends 200 ? Response200 : Response500;

const checkDisplayName = async (name: string): Promise<Response<200 | 500>> =>
	await fetch(`/api/db/checkDisplayName?displayName=${name}`).then((res) => res.json());

interface Props {
	user: User;
}

const UsernameInput = ({ user }: Props) => {
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isNameAvailable, setIsNameAvailable] = useState(false);
	const [validationFeedback, setValidationFeedback] = useState<string[]>([]);

	const hasFeedback = validationFeedback.length !== 0;

	const setDebouncedFeedback = useCallback(() => {
		if (inputValue === '') {
			setValidationFeedback([]);
			setIsLoading(false);
			return;
		}

		checkDisplayName(inputValue).then((result) => {
			setIsLoading(false);
			console.log(result);

			if (result.status === 200)
				if (result.available) {
					setIsNameAvailable(true);
					setValidationFeedback([]);
				} else setValidationFeedback(result.validationErrors);
		});
	}, [inputValue, setValidationFeedback, setIsLoading]);

	useEffect(() => {
		setIsLoading(true);
		setIsNameAvailable(false);

		const debounceTimeout = setTimeout(setDebouncedFeedback, 800);

		return () => {
			clearTimeout(debounceTimeout);
		};
	}, [inputValue, setDebouncedFeedback, setIsLoading]);

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
							<Button content='icon' size='fill' onClick={() => {}}>
								<BsHandThumbsUpFill />
							</Button>
						) : null}
					</ButtonContainer>
				</InputContainer>
			</Form>
			<FeedbackContainer>
				{hasFeedback ? (
					<>
						<Label className='title'>That username...</Label>
						<List>
							{validationFeedback.map((item) => (
								<li key={item}>{item}</li>
							))}
						</List>
					</>
				) : null}
				<Label className='title'>Your username must be...</Label>
				<List>
					<li>Be at least 5 characters long</li>
					<li>Be at most 15 characters long</li>
					<li>{'Have no special characters (!?-.@&$) or spaces'}</li>
					<li>{'Have no bad words'}</li>
				</List>
			</FeedbackContainer>
		</>
	);
};

export default UsernameInput;
