import React, { PropsWithChildren, useRef, useState } from 'react';
import { styled, theme } from 'stiches.config';

import Button from '@components/ui/Button';

const Section = styled('article', {
	margin: '2rem',
	marginBottom: 0,
	borderRadius: theme.space.borderRad,
	border: `1px solid ${theme.colors.grey800}`,
	transition: '.35s ease',
	'&.collapse': {
		borderColor: 'transparent',
	},
});

const SectionHeader = styled('header', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '.75rem 2rem',
	color: theme.colors.textLightActive,
	backgroundColor: theme.colors.frostedPrimary,
	borderRadius: theme.space.borderRad,
	transition: 'background-color .35s ease, color .35s ease',
	cursor: 'pointer',
	'&.collapse': {
		color: theme.colors.textMediumActive,
		backgroundColor: theme.colors.frosted,
	},
	'&:hover': {
		color: theme.colors.textLightActive,
	},
	h2: {
		margin: 0,
	},
});

const SectionBody = styled('div', {
	height: 0,
	borderBottomRightRadius: theme.space.borderRad,
	borderBottomLeftRadius: theme.space.borderRad,
	overflow: 'hidden',
	transition: '.5s ease',
});

const SectionBodyContent = styled('div', {
	padding: '1rem 2rem',
});

interface Props {
	title: string;
}

const ProfileSection = ({ title, children }: PropsWithChildren<Props>) => {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const bodyRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		if (!bodyRef.current) return;

		if (isCollapsed) bodyRef.current.style.height = bodyRef.current.scrollHeight + 'px';
		else bodyRef.current.style.height = '0px';

		setIsCollapsed((current) => !current);
	};

	return (
		<Section className={isCollapsed ? 'collapse' : ''}>
			<SectionHeader className={isCollapsed ? 'collapse' : ''} onClick={handleClick}>
				<h2>{title}</h2>
				<Button content='icon' onClick={() => {}}>
					+
				</Button>
			</SectionHeader>
			<SectionBody ref={bodyRef} className={isCollapsed ? 'collapse' : ''}>
				<SectionBodyContent>{children}</SectionBodyContent>
			</SectionBody>
		</Section>
	);
};

export default ProfileSection;
