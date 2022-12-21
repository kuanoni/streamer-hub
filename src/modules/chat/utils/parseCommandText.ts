const parseCommandText = (text: string) => {
	console.log(`cmd text: [${text}]`);

	const firstSpaceIdx = text.indexOf(' ');

	if (firstSpaceIdx === -1) {
		const command = text.slice(1);
		const params = '';
		return [command, params];
	} else {
		const command = text.slice(1, firstSpaceIdx);
		const params = text.slice(firstSpaceIdx + 1);
		return [command, params];
	}
};

export default parseCommandText;
