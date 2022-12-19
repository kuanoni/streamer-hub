import { useCallback, useEffect, useState } from 'react';
import { styled, theme } from 'stiches.config';

import TextInput from '@components/ui/TextInput';
import { User } from '@globalTypes/custom-auth';

import { Label, List } from '../styles';

const InputContainer = styled('form', {
	display: 'flex',
	alignItems: 'end',
	padding: '.5rem 1rem',
	backgroundColor: theme.colors.primary900,
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
	const [isFetching, setIsFetching] = useState(false);
	const [usernameFeedback, setUsernameFeedback] = useState<string[]>([]);

	const hasErrors = usernameFeedback.length !== 0;

	const setDebouncedFeedback = useCallback(() => {
		if (inputValue === '') return setUsernameFeedback([]);

		setIsFetching(true);
		checkDisplayName(inputValue).then((result) => {
			setIsFetching(false);
			console.log(result);

			if (result.status === 200 && !result.available) setUsernameFeedback(result.validationErrors);
		});
	}, [inputValue, setUsernameFeedback, setIsFetching]);

	// set debounce timer
	useEffect(() => {
		const debounceTimeout = setTimeout(setDebouncedFeedback, 800);

		return () => {
			clearTimeout(debounceTimeout);
		};
	}, [inputValue, setDebouncedFeedback]);

	return (
		<>
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
			</InputContainer>
			<FeedbackContainer>
				{hasErrors ? (
					<>
						<Label className='title'>That username...</Label>
						<List>
							{usernameFeedback.map((item) => (
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
