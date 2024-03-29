import React, { ForwardedRef, forwardRef } from 'react';
import { styled, theme } from 'stiches.config';

import { CSS } from '@stitches/react';

const Container = styled('section', {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	border: `1px solid ${theme.colors.grey700}`,
	borderRadius: theme.space.borderRad,
	overflow: 'hidden',
});

const Header = styled('div', {
	padding: '1rem',
	paddingBottom: '.5rem',
	backgroundColor: theme.colors.primary600,
	h1: {
		margin: 0,
	},
});

const Content = styled('div', {
	scrollbarWidth: 'thin',
	'&::-webkit-scrollbar': {
		width: 8,
	},
});

interface SectionProps {
	css?: CSS;
}

interface HeaderProps {
	css?: CSS;
}

interface ContentProps {
	css?: CSS;
}

const Section = ({ css, children }: React.PropsWithChildren<SectionProps>) => {
	return <Container css={css}>{children}</Container>;
};

const SectionHeader = ({ css, children }: React.PropsWithChildren<HeaderProps>) => {
	return (
		<Header css={css}>
			<h1>{children}</h1>
		</Header>
	);
};

const SectionContent = forwardRef(
	({ css, children }: React.PropsWithChildren<ContentProps>, ref: ForwardedRef<HTMLDivElement>) => {
		return (
			<Content ref={ref} css={css}>
				{children}
			</Content>
		);
	}
);

Section.Header = SectionHeader;
Section.Content = SectionContent;

SectionContent.displayName = 'SectionContent';

export default Section;
