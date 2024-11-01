/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    images:{
        domains:['res.cloudinary.com'],
        unoptimized:true
    }
};

export default nextConfig;