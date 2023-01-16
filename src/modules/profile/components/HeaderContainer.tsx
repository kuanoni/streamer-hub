import { User } from 'next-auth';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { styled, theme } from 'stiches.config';

const Grid = styled('div', {
	display: 'grid',
	gridAutoFlow: 'column',
	gridTemplateColumns: '14rem auto',
	gridTemplateRows: '6rem auto',
	gridTemplateAreas: `
	    "cutout username"
	    "avatar info"
	`,
	width: '100%',
	'@xs': {
		gridTemplateColumns: '1fr',
		gridTemplateRows: 'auto auto auto auto',
		gridTemplateAreas: `
        "cutout"
        "avatar"
        "username"
            "info"
	    `,
	},
});

const Cutout = styled('div', {
	gridArea: 'cutout',
	width: '100%',
	height: '6rem',
	margin: '0 auto',
	borderTopLeftRadius: theme.space.borderRad,
	backgroundImage: `radial-gradient(circle at 50% 8.2rem, transparent 6rem, ${theme.colors.primary600} 0)`,
});

const Avatar = styled(Image, {
	gridArea: 'avatar',
	display: 'block',
	width: '10rem',
	height: '10rem',
	margin: '0 auto',
	marginTop: '-3rem',
	borderRadius: '50%',
	zIndex: 1,
});

interface Props {
	user: User;
}

const ProfileHeaderContainer = ({ user, children }: PropsWithChildren<Props>) => {
	if (!user) return <></>;

	return (
		<Grid>
			<Cutout />
			<Avatar
				src={user.avatar}
				alt='profile picture'
				width={128}
				height={128}
				placeholder='blur'
				blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='
				referrerPolicy='no-referrer'
			/>
			{children}
		</Grid>
	);
};

export default ProfileHeaderContainer;
