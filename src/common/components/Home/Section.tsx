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
	return <>{children}</>;
};

Section.Header = SectionHeader;
Section.Content = SectionContent;

export default Section;
