import React from 'react';
import { styled, theme } from 'stiches.config';

const Container = styled('div', {
	width: '100%',
	backgroundColor: theme.colors.grey1000,
	borderRadius: theme.space.borderRad,
	overflow: 'hidden',
});

const Header = styled('div', {
	padding: '1rem',
	paddingBottom: '.25rem',
	backgroundColor: theme.colors.grey900,
	h1: {
		margin: 0,
	},
});

const Content = styled('div', {});

interface ContentProps {
	overflowY?: string;
	maxHeight?: number | string;
}

const Section = ({ children }: React.PropsWithChildren) => {
	return <Container>{children}</Container>;
};

const SectionHeader = ({ children }: React.PropsWithChildren) => {
	return (
		<Header>
			<h1>{children}</h1>
		</Header>
	);
};

const SectionContent = ({ overflowY, maxHeight, children }: React.PropsWithChildren<ContentProps>) => {
	return <Content css={{ overflowY, maxHeight }}>{children}</Content>;
};

Section.Header = SectionHeader;
Section.Content = SectionContent;

export default Section;
