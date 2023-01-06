const parseCommandText = (text: string): CommandMessage => {
	const firstSpaceIdx = text.indexOf(' ');

	if (firstSpaceIdx === -1) {
		const name = text.slice(1);
		const params = '';
		return { name, params };
	} else {
		const name = text.slice(1, firstSpaceIdx);
		const params = text.slice(firstSpaceIdx + 1);
		return { name, params };
	}
};

export default parseCommandText;
