import Link from 'next/link';
import { useRouter } from 'next/router';
import { styled, theme } from 'stiches.config';

const NavLink = styled(Link, {
	position: 'relative',
	display: 'inline-flex',
	alignItems: 'end',
	padding: '1rem 2rem',
	color: theme.colors.textMedium,
	borderBottom: `1px solid transparent`,
	fontWeight: 500,
	transform: 'translateY(1px)',
	transition: 'border-color background .2s ease',
	'&::after': {
		content: '',
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: '0%',
		background: 'linear-gradient(180deg, rgba(183, 79, 255, 0) 0%, rgba(183, 79, 255, 0.2) 100%)',
		transition: 'height .1s ease-in',
	},
	'&:hover': {
		color: theme.colors.textMediumActive,
		borderColor: theme.colors.textPrimaryMedium,
		textDecoration: 'none',
	},
	'&:hover::after': {
		height: '100%',
	},
	'&:active': {
		color: theme.colors.secondary300,
		transitionDuration: '0s',
	},
	'&:active::after': {
		background: 'linear-gradient(180deg, rgba(183, 79, 255, 0) 0%, rgba(183, 79, 255, 0.2) 50%)',
	},
	'&.current': {
		color: theme.colors.textPrimaryMedium,
	},
	'&.current::after': {
		height: '100%',
		background: 'linear-gradient(180deg, rgba(183, 79, 255, 0) 0%, rgba(183, 79, 255, 0.2) 50%)',
	},
	svg: { display: 'none' },
	'@sm': {
		alignItems: 'center',
		gap: '1rem',
		width: '100%',
		svg: { fontSize: '1rem', display: 'block' },
	},
});

const NavButton = ({ link, children }: { link: string; children: React.ReactNode }) => {
	const router = useRouter();
	return (
		<NavLink href={link} className={'btn-nav' + (router.asPath.split('#')[0] === link ? ' current' : '')}>
			{children}
		</NavLink>
	);
};

NavButton.toString = () => '.btn-nav';

export default NavButton;
