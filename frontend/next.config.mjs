/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        URL_DEFAULT: process.env.URL_DEFAULT,
    },
    reactStrictMode:false,
};

export default nextConfig;
