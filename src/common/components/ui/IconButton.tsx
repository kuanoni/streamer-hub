import { MouseEventHandler, PropsWithChildren } from 'react';
import { theme } from 'stiches.config';

import { CSS } from '@stitches/react';

import Button, { ButtonColors } from './Button';

interface Props {
	color?: ButtonColors;
	size?: string | number;
	iconSizeRatio?: number;
	onClick: MouseEventHandler<HTMLButtonElement>;
}

const IconButton = ({
	color = 'primary',
	size = 36,
	iconSizeRatio = 0.55,
	onClick,
	children,
}: PropsWithChildren<Props>) => {
	const css: CSS = {
		position: 'relative',
		width: size,
		height: size,
		svg: {
			position: 'absolute',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			width: `${100 * iconSizeRatio}%`,
			height: `${100 * iconSizeRatio}%`,
		},
	};

	return (
		<Button className='btn-icon' color={color} css={css} onClick={onClick}>
			{children}
		</Button>
	);
};

IconButton.toString = () => '.btn-icon';

export default IconButton;
