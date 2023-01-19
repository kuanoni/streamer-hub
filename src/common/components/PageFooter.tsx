import { styled, theme } from 'stiches.config';

const Container = styled('footer', {
	gridArea: 'footer',
	width: '100%',
	marginTop: '4rem',
	backgroundColor: theme.colors.primary800,
});

const Content = styled('ul', {
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'center',
	alignItems: 'center',
	width: theme.space.pageWidth,
	maxWidth: '100vw',
	margin: '0 auto',
	padding: '.5rem 2rem',
	color: theme.colors.textMedium,
	fontSize: '.9rem',
	listStyle: 'none',
	'& li:not(:last-child)::after': {
		content: '•',
		margin: '0 .75rem',
	},
	a: { color: 'inherit' },
	'& a:hover': {
		color: theme.colors.textMediumActive,
	},
	'@sm': {
		display: 'block',
		padding: '1rem',
		lineHeight: 1.5,
		'& > *:first-child': {
			color: theme.colors.textLight,
			fontSize: '1.25em',
		},
		'& li:not(:last-child)::after': {
			content: '',
			margin: 0,
		},
		a: {
			textDecoration: 'underline',
		},
	},
});

interface Props {}

const PageFooter = ({}: Props) => {
	return (
		<Container>
			<Content>
				<li>KroyOoz.tv ©</li>
				<li>
					<a href='mailto: kainoaaraizak@gmail.com'>Contact</a>
				</li>
				<li>
					<a href='#'>Terms & Privacy</a>
				</li>
				<li>
					<a href='https://github.com/kuanoni/streamer-hub'>Open Source</a>
				</li>
				<li>v0.0.1</li>
			</Content>
		</Container>
	);
};

export default PageFooter;
