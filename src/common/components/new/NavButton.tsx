import Link from 'next/link';
import { useRouter } from 'next/router';
import { styled, theme } from 'stiches.config';

const NavLink = styled(Link, {
	position: 'relative',
	display: 'inline-flex',
	alignItems: 'end',
	padding: '16px 32px',
	color: theme.colors.textMedium,
	borderBottom: `1px solid transparent`,
	fontFamily: 'DM Sans',
	fontSize: '1rem',
	fontWeight: 500,
	verticalAlign: 'bottom',
	transform: 'translateY(1px)',
	transition: 'color border-color background .2s ease',
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
		borderColor: theme.colors.primary400,
	},
	'&:hover::after': {
		height: '100%',
	},
	'&:active': {
		color: theme.colors.trinary000,
	},
	'&:active::after': {
		background: 'linear-gradient(180deg, rgba(183, 79, 255, 0) 0%, rgba(183, 79, 255, 0.2) 50%)',
	},
	'&.current': {
		color: theme.colors.primary400,
	},
	'&.current::after': {
		height: '100%',
		background: 'linear-gradient(180deg, rgba(183, 79, 255, 0) 0%, rgba(183, 79, 255, 0.2) 50%)',
	},
});

const NavButton = ({ link, children }: { link: string; children: React.ReactNode }) => {
	const router = useRouter();
	return (
		<NavLink href={link} className={router.asPath.split('#')[0] === link ? 'current' : ''}>
			{children}
		</NavLink>
	);
};

export default NavButton;
