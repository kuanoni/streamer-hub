import React from 'react';
import { styled, theme } from 'stiches.config';

import injectMarkdownStyles from '@modules/chat/utils/injectTextWithMarkdown';

const Container = styled('div', {
	position: 'relative',
	margin: '.25rem',
	padding: '.5rem',
	fontSize: '13px',
	backgroundColor: 'rgba(149, 149, 149, 0.15)',
	borderRadius: theme.space.borderRad,
	overflow: 'hidden',
});

const TopBorder = styled('div', {
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	height: 4,
	backgroundColor: theme.colors.primary700,
});

const BotBorder = styled('div', {
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	height: 4,
	backgroundColor: theme.colors.primary700,
});

const Author = styled('div', {
	marginTop: '.5rem',
	fontWeight: 700,
});

const Title = styled('div', {
	marginTop: '.5rem',
	fontSize: '1rem',
	fontWeight: 700,
});

const Description = styled('div', {
	marginTop: '.5rem',
	color: theme.colors.textMedium,
});

const FieldsContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '.5rem',
	marginTop: '.5rem',
});

const Field = styled('div', {});

const FieldName = styled('div', {
	fontWeight: 700,
});

const FieldDescription = styled('div', {
	color: theme.colors.textMedium,
});

const Footer = styled('div', {
	margin: '.5rem 0',
});

const FooterTitle = styled('div', {
	fontSize: '11px',
});

const FooterTimestamp = styled('div', {});

interface Props {
	embed: Embed;
	time: string;
}

const embed: Embed = {
	author: 'Embed Generator',
	title: 'Welcome to Embed Generator!',
	description:
		"**This is an embed!** It's the primary way to *style* your message!\nYou can change the text, add **images**, and structure your content.",
	fields: [
		{
			title: 'Field 1',
			description: 'Fields can be used to create simple tables with multiple columns.',
		},
		{
			title: 'Field 2',
			description: 'Fields can be aligned next to each other (inline) or below each other.',
		},
	],
	footer: {
		title: 'Embeds are pretty cool in my opinion!',
		timestamp: '',
	},
};

const EmbedMessage = React.memo(({ embed, time }: Props) => {
	return (
		<Container>
			<Author>{embed.author}</Author>
			<Title>{embed.title}</Title>
			<Description>{embed.description && injectMarkdownStyles(embed.description)}</Description>
			<FieldsContainer>
				{embed.fields &&
					embed.fields.map((field: Field, i: number) => (
						<Field key={i}>
							<FieldName>{field.title}</FieldName>
							<FieldDescription>
								{field.description && injectMarkdownStyles(field.description)}
							</FieldDescription>
						</Field>
					))}
			</FieldsContainer>
			<Footer>
				<FooterTitle>{embed.footer?.title}</FooterTitle>
				<FooterTimestamp>{embed.footer?.timestamp}</FooterTimestamp>
			</Footer>

			<TopBorder />
			<BotBorder />
		</Container>
	);
});

export default EmbedMessage;
