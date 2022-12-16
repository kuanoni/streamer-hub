import Router from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { MoonLoader } from 'react-spinners';
import PulseLoader from 'react-spinners/PulseLoader';
import { useDebounce } from 'src/common/hooks/useDebounce';
import { keyframes, styled, theme } from 'stiches.config';

import { User } from '@globalTypes/custom-auth';

import Button from '../../../common/components/ui/Button';
import TextInput from '../../../common/components/ui/TextInput';
import { List } from '../styles';

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

const checkNameAvailability = async (name: string) => {
	const res = await fetch(`/api/db/checkDisplayName?name=${name}`, {
		method: 'GET',
	}).then((res) => res.json());

	console.log(res);
};

const DisplayNameInput = ({ user }: Props) => {
	const [displayNameValue, setDisplayNameValue] = useState('');
	const [errors, setErrors] = useState<string[]>([]);
	const debouncedDisplayName = useDebounce(displayNameValue, 800);
	const isDebounced = displayNameValue === debouncedDisplayName;

	const nameAvailableIndicator = useMemo(async () => {
		const validationErrors = validateDisplayName(debouncedDisplayName);
		if (validationErrors.length) return setErrors(validationErrors);
		const isAvailable = await checkNameAvailability(debouncedDisplayName);
	}, [debouncedDisplayName]);

	// useEffect(() => {
	// 	const validationErrors = validateDisplayName(debouncedDisplayName);
	// 	if (validationErrors.length) return setErrors(validationErrors);
	// }, [debouncedDisplayName, setErrors]);

	const submitDisplayName = async () => {
		if (displayNameValue !== debouncedDisplayName) return;

		const validationErrors = validateDisplayName(displayNameValue);
		if (validationErrors.length) return;

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
				{!errors && isDebounced && (
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
				<List>
					{errors.map((item) => (
						<li key={item}>{item}</li>
					))}
				</List>
			</ErrorsContainer>
		</Container>
	);
};

export default DisplayNameInput;
