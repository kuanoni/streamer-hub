import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { BsDash, BsPlus } from 'react-icons/bs';
import { styled, theme } from 'stiches.config';

const Section = styled('article', {
	margin: '2rem',
	marginBottom: 0,
	borderRadius: theme.space.borderRad,
	border: `1px solid ${theme.colors.grey800}`,
	transition: '.2s ease',
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
	transition: 'background-color .2s ease, color .2s ease',
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
	svg: {
		width: '1.5rem',
		height: '1.5rem',
	},
});

const SectionBody = styled('div', {
	height: 0,
	borderBottomRightRadius: theme.space.borderRad,
	borderBottomLeftRadius: theme.space.borderRad,
	overflow: 'hidden',
	transition: '.35s ease',
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

	const toggleCollapse = useCallback(
		(forceOpen: boolean = false) => {
			if (!bodyRef.current) return;

			setIsCollapsed((current) => {
				// altering bodyRef is done here to avoid adding isCollapsed to callback dependacy
				if (!bodyRef.current) return !(current || forceOpen);
				if (current || forceOpen) bodyRef.current.style.height = bodyRef.current.scrollHeight + 'px';
				else bodyRef.current.style.height = '0px';
				return !(current || forceOpen);
			});
		},
		[setIsCollapsed]
	);

	useEffect(() => {
		// open section if hash matches section title
		if (window.location.hash.startsWith(`#${title.toLowerCase()}`)) toggleCollapse(true);
	}, [title, toggleCollapse]);

	return (
		<Section className={isCollapsed ? 'collapse' : ''}>
			<SectionHeader className={isCollapsed ? 'collapse' : ''} onClick={() => toggleCollapse()}>
				<h2>{title}</h2>
				{isCollapsed ? <BsPlus /> : <BsDash />}
			</SectionHeader>
			<SectionBody ref={bodyRef} className={isCollapsed ? 'collapse' : ''}>
				<SectionBodyContent>{children}</SectionBodyContent>
			</SectionBody>
		</Section>
	);
};

export default ProfileSection;
