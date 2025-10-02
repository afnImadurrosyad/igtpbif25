/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Ganti dengan domain gambar Anda
        pathname: '/ddzjskfyn/image/upload/**' // Anda juga bisa menambahkan port dan pathname jika perlu
      },
    ],
  },
};

export default nextConfig;
