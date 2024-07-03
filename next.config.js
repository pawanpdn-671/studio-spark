/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "uploadthing.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "utfs.io",
				port: "",
			},
			{
				protocol: "https",
				hostname: "img.clerk.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "subdomain",
				port: "",
			},
			{
				protocol: "https",
				hostname: "files.stripe.com",
				port: "",
			},
		],
		// domains: ["uploadthing.com", "utfs.io", "img.clerk.com", "subdomain", "files.stripe.com"],
	},
	reactStrictMode: false,
};

module.exports = nextConfig;
