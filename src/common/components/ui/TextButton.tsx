import { MouseEventHandler, PropsWithChildren } from 'react';
import { theme } from 'stiches.config';

import { CSS } from '@stitches/react';

import Button, { ButtonColors } from './Button';

interface Props {
	onClick: MouseEventHandler<HTMLButtonElement>;
	color?: ButtonColors;
}

const TextButton = ({ color = 'primary', onClick, children }: PropsWithChildren<Props>) => {
	const css: CSS = {
		padding: '.5rem 2.25rem',
	};

	return (
		<Button className='btn-text' color={color} css={css} onClick={onClick}>
			{children}
		</Button>
	);
};

TextButton.toString = () => '.btn-text';

export default TextButton;
