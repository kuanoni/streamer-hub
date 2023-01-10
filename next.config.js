/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			'lh3.googleusercontent.com',
			'cdn.discordapp.com',
			'b.thumbs.redditmedia.com',
			'a.thumbs.redditmedia.com',
		],
	},
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
