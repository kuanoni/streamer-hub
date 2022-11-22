// https://levelup.gitconnected.com/all-you-need-to-know-about-environment-variables-in-typescript-2e7042edfac7

export default function extractStringEnvVar(key: keyof NodeJS.ProcessEnv): string {
	const value = process.env[key];

	if (value === undefined) {
		const message = `The environment variable "${key}" cannot be "undefined".`;

		throw new Error(message);
	}

	return value;
}
