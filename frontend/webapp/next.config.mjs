/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import nextPWA from '@ducanh2912/next-pwa';

const withPWA = nextPWA({
	dest: 'public',
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
	swMinify: true,
	disable: false,
	workboxOptions: {
		disableDevLogs: true,
	},
});

const nextConfig = {
	reactStrictMode: true,
	env: {
		AUTHENTICATION_TOKEN: process.env.AUTHENTICATION_TOKEN,
	},
};

export default withPWA(nextConfig);
