// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Ou false, dependendo da sua configuração
  images: {
    domains: ['via.placeholder.com'], // <-- ADICIONE ESTA LINHA OU O DOMÍNIO
  },
};

module.exports = nextConfig;