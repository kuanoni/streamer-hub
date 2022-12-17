import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { MoonLoader } from 'react-spinners';
import { useDebounce } from 'src/common/hooks/useDebounce';
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

const ErrorsContainer = styled('div', {
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

const checkNameAvailability = async (name: string): Promise<Response200 | Response500> => {
	const res = await fetch(`/api/db/checkDisplayName?displayName=${name}`, {
		method: 'GET',
	}).then((res) => res.json());

	return res;
};

const DisplayNameInput = ({ user }: Props) => {
	const [displayNameValue, setDisplayNameValue] = useState('');
	const [errors, setErrors] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const debouncedDisplayName: string = useDebounce(displayNameValue, 800);
	const isDebounced = displayNameValue === debouncedDisplayName;
	const hasErrors = errors.length !== 0;
	const showSubmitButton = !isLoading && !hasErrors && displayNameValue.length !== 0 && isDebounced;

	useEffect(() => {
		if (debouncedDisplayName === '') return setErrors([]);

		const newErrors: string[] = [];
		// spaces cant be sent over an http query, so the validation has to be handled here
		if (debouncedDisplayName.includes(' ')) newErrors.push('Contains spaces');

		setIsLoading(true);
		checkNameAvailability(debouncedDisplayName).then((res) => {
			if (res.status === 200) setErrors([...newErrors, ...res.validationErrors]);
			else setErrors(newErrors);
			setIsLoading(false);
		});
	}, [debouncedDisplayName, setErrors]);

	const submitDisplayName = async () => {
		if (displayNameValue !== debouncedDisplayName) return;

		const availableRes = await checkNameAvailability(displayNameValue);

		if (availableRes.status === 500) return console.log(availableRes.message);
		if (availableRes.status === 200 && (availableRes.validationErrors.length || !availableRes.available))
			return console.log(availableRes.validationErrors);

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
				{showSubmitButton && (
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
				{hasErrors ? <Label className='title'>Unfortunately, that username...</Label> : null}
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
