const fetchLivestreamData = async () => {
	const data = await fetch('/api/getLivestreamData').then((res) => res.json());
	return data.live || false;
};

export default fetchLivestreamData;
