const fetchLivestreamStatus = async () => {
	const data = await fetch('/api/checkLivestreamStatus').then((res) => res.json());
	return data.live || false;
};

export default fetchLivestreamStatus;
