const parseCookieString = (str: string) =>
	str
		.split(';')
		.map((v) => v.split('='))
		.reduce((acc, v) => {
			acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
			return acc;
		}, {} as { [i: string]: string });

export default parseCookieString;
