import Router from 'next/router';
import React, { useMemo, useState } from 'react';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { MoonLoader } from 'react-spinners';
import PulseLoader from 'react-spinners/PulseLoader';
import { useDebounce } from 'src/hooks/useDebounce';
import { keyframes, styled, theme } from 'stiches.config';

import { User } from '@globalTypes/custom-auth';

import { List } from './Profile/styles';
import Button from './ui/Button';
import TextInput from './ui/TextInput';

interface Props {
	user: User;
}

const Container = styled('div', {
	display: 'flex',
	gap: '1rem',
	width: '100%',
});

const ErrorsContainer = styled('div', {
	color: theme.colors.textMedium,
	fontSize: '.9rem',
	paddingRight: '2rem',
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

const displayNameRegex = /^[a-zA-Z0-9 ]+$/;

const validateDisplayName = (name: string) => {
	const errors = [];
	if (name.length < 5) errors.push(`At least 5 characters. (${name.length}/5)`);
	if (name.length > 15) errors.push(`At most 15 characters. (${name.length}/15)`);
	if (!displayNameRegex.test(name) && name.length) errors.push('Only letters or numbers');
	if (name.includes(' ')) errors.push('No spaces');
	return errors;
};

const DisplayNameInput = ({ user }: Props) => {
	const [displayNameValue, setDisplayNameValue] = useState('');
	const debouncedDisplayName = useDebounce(displayNameValue, 300);
	const isDebounced = displayNameValue === debouncedDisplayName;

	const errorList = useMemo(() => {
		const validationErrors = validateDisplayName(debouncedDisplayName);
		return validationErrors.map((item) => <li key={item}>{item}</li>);
	}, [debouncedDisplayName]);

	const submitDisplayName = async () => {
		if (displayNameValue !== debouncedDisplayName) return;

		const validationErrors = validateDisplayName(displayNameValue);
		if (validationErrors.length) return;

		// check db is displayName is already taken

		const res = await fetch('/api/db/userSetDisplayName', {
			method: 'PATCH',
			body: JSON.stringify({ _id: user?.id, displayName: displayNameValue }),
		}).then((res) => res.json());

		if (res.status === 200) Router.reload();
		// handle response errors here
	};

	return (
		<Container>
			<InputContainer>
				<TextInput
					value={displayNameValue}
					setValue={setDisplayNameValue}
					placeholder={'Enter username...'}
					autoFocus
					maxLength={15}
					color='transparent'
					size='huge'
				/>
				{!errorList.length && isDebounced && (
					<ButtonContainer>
						<Button content='icon' size='fill' onClick={submitDisplayName}>
							<BsFillHandThumbsUpFill />
						</Button>
					</ButtonContainer>
				)}
				{!isDebounced && (
					<ButtonContainer>
						<MoonLoader color={theme.colors.textLight.toString()} loading={true} size={30} />
					</ButtonContainer>
				)}
			</InputContainer>
			<ErrorsContainer>
				<List>{errorList}</List>
			</ErrorsContainer>
		</Container>
	);
};

export default DisplayNameInput;
