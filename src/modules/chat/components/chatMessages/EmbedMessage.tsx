import React from 'react';
import { styled, theme } from 'stiches.config';

import { EmbedColors } from '@modules/chat/common';
import injectMarkdownStyles from '@modules/chat/utils/injectTextWithMarkdown';

const timeTitleFormatter = new Intl.DateTimeFormat('default', {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
	hour12: false,
});

const Container = styled('div', {
	position: 'relative',
	margin: '.25rem',
	padding: '4px .5em',
	fontSize: '13px',
	backgroundColor: 'rgba(149, 149, 149, 0.15)',
	borderRadius: theme.space.borderRad,
	overflow: 'hidden',
});

const borderColors = {
	[EmbedColors.primary]: {
		backgroundColor: theme.colors.primary700,
	},
	[EmbedColors.blue]: {
		backgroundColor: theme.colors.secondary900,
	},
	[EmbedColors.green]: {
		backgroundColor: theme.colors.trinary900,
	},
	[EmbedColors.red]: {
		backgroundColor: 'red',
	},
};

const Border = styled('div', {
	position: 'absolute',
	left: 0,
	right: 0,
	height: 4,
	variants: {
		color: borderColors,
		position: {
			top: {
				top: 0,
			},
			bottom: {
				bottom: 0,
			},
		},
	},
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
	margin: '.5rem 0',
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
	color: theme.colors.textDark,
	fontSize: '11px',
});

const FooterTitle = styled('div', {});

const Timestamp = styled('time', {
	display: 'block',
	margin: '.5rem 0',
	color: theme.colors.textDark,
	fontSize: '11px',
});

interface Props {
	embedData: EmbedData;
	time: number;
}

const EmbedMessage = React.memo(({ embedData, time }: Props) => {
	const color = embedData.color || EmbedColors.primary;
	const dateObj = new Date(time);
	const timeTitle = timeTitleFormatter.format(dateObj);

	return (
		<Container>
			{embedData.author && <Author>{embedData.author}</Author>}
			{embedData.title && <Title>{embedData.title}</Title>}
			{embedData.description && (
				<Description>{embedData.description && injectMarkdownStyles(embedData.description)}</Description>
			)}
			{embedData.fields && (
				<FieldsContainer>
					{embedData.fields.map((field: Field, i: number) => (
						<Field key={i}>
							<FieldName>{field.title}</FieldName>
							<FieldDescription>
								{field.description && injectMarkdownStyles(field.description)}
							</FieldDescription>
						</Field>
					))}
				</FieldsContainer>
			)}
			{embedData.footer && (
				<Footer>
					<FooterTitle>{embedData.footer?.title}</FooterTitle>
				</Footer>
			)}
			<Timestamp>{timeTitle}</Timestamp>
			<Border position='top' color={color} />
			<Border position='bottom' color={color} />
		</Container>
	);
});

EmbedMessage.displayName = 'EmbedMessage';

export default EmbedMessage;
