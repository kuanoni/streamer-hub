import { BsX } from 'react-icons/bs';
import { keyframes, styled, theme } from 'stiches.config';

import Button from '@components/ui/Button';

const moveIn = keyframes({
	'0%': {
		opacity: 0,
		transform: 'translateY(25px)',
	},
	'100%': {
		opacity: 1,
		transform: 'translateY(0px)',
	},
});

const PopupContainer = styled('div', {
	marginTop: '.5rem',
	paddingBottom: '1rem',
	fontSize: '.9rem',
	animation: `${moveIn} .2s`,
});

const Header = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '.5rem',
	paddingLeft: '1rem',
	backgroundColor: theme.colors.primary900,
	borderBottom: `1px solid ${theme.colors.trinary700}`,
});

const HeaderTitles = styled('div', {
	h2: {
		display: 'inline',
		margin: 0,
		fontSize: '1.25rem',
	},
	h4: {
		display: 'inline',
		margin: 0,
		color: theme.colors.textMedium,
	},
});

const HeaderButtons = styled('div', {
	display: 'flex',
	gap: '1rem',
});

const Content = styled('div', {
	height: '100%',
	paddingTop: '.5rem',
});

interface Props {
	title: string;
	subtitle?: string;
	closePopup: () => void;
}

const ChatPopup = ({ children }: React.PropsWithChildren) => {
	return <PopupContainer>{children}</PopupContainer>;
};

ChatPopup.Header = ({ title, subtitle, closePopup, children }: React.PropsWithChildren<Props>) => (
	<Header>
		<HeaderTitles>
			<h2>{title}</h2>
			<h4>{subtitle}</h4>
		</HeaderTitles>
		<HeaderButtons>
			{children}
			<Button color='primaryTransparent' content='icon' size='2em' onClick={() => closePopup()}>
				<BsX viewBox='3 3 10 10' />
			</Button>
		</HeaderButtons>
	</Header>
);

ChatPopup.Content = ({ children }: React.PropsWithChildren) => <Content>{children}</Content>;

export default ChatPopup;
