import React from 'react';
import { styled, theme } from 'stiches.config';

const Container = styled('div', {
	width: '100%',
	backgroundColor: theme.colors.frosted,
	borderRadius: theme.space.borderRad,
	overflow: 'hidden',
});

const Header = styled('div', {
	padding: '1rem',
	paddingBottom: '.25rem',
	backgroundColor: theme.colors.primary900,
	h1: {
		margin: 0,
	},
});

const Content = styled('div', {
	padding: '1rem',
});

interface Props {}

const Section = ({ children }: React.PropsWithChildren<Props>) => {
	return <Container>{children}</Container>;
};

const SectionHeader = ({ children }: React.PropsWithChildren) => {
	return (
		<Header>
			<h1>{children}</h1>
		</Header>
	);
};

const SectionContent = ({ children }: React.PropsWithChildren) => {
	return <Content>{children}</Content>;
};

Section.Header = SectionHeader;
Section.Content = SectionContent;

export default Section;
