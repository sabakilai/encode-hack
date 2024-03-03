/** @type {import('next').NextConfig} */

import million from 'million/compiler';
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
};

const millionConfig = {
	// auto: {
	//   threshold: 0.1, // default: 0.1,
	//   skip: ["useBadHook", /badVariable/g], // default []
	//   // if you're using RSC: auto: { rsc: true },
	//   rsc: true,
	// },
	auto: false,
};

export default withPWA(million.next(nextConfig, millionConfig));
