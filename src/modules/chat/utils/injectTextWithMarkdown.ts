import React from 'react';

const markdownStyles = [
	{ tag: 'b', regex: /\*\*([^*]+)\*\*/g },
	{ tag: 'i', regex: /\*([^*]+)\*/g },
	{ tag: 'code', regex: /\`([^*]+)\`/g },
	{ tag: 'br', regex: /[\n]/g, selfClosing: true },
];

const injectMarkdownStyles = (text: string) => {
	let nodeArray: React.ReactNode[] = [text];

	for (const { tag, regex, selfClosing } of markdownStyles) {
		// loops over itself for each markdown style
		nodeArray = nodeArray.flatMap((node) => {
			if (typeof node !== 'string') return node;

			// check if any syntax for markdown is found
			const matches = node.match(regex);
			if (!matches) return node;

			let i = 0;
			const replacedText = node.replace(regex, () => `{substring_${i++}}`);
			const substrings = replacedText.split(/{substring_\d+}/);

			const result = [];

			for (let i = 0; i < substrings.length - 1; i++) {
				result.push(substrings[i]);
				if (selfClosing) result.push(React.createElement(tag, { key: `${tag}_${i}` }));
				else result.push(React.createElement(tag, { key: `${tag}_${i}` }, matches[i].replace(regex, '$1')));
			}

			result.push(substrings[substrings.length - 1]);

			return result;
		});
	}

	return nodeArray;
};

export default injectMarkdownStyles;
