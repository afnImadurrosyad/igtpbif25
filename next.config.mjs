/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'igttpb.site', // Ganti dengan domain gambar Anda
        // Anda juga bisa menambahkan port dan pathname jika perlu
      },
    ],
  },
};

export default nextConfig;
