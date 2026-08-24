/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Every route in this app is prerendered, so it ships as a plain static site.
  // That is what the base build prompt asks for, and it means the host needs no
  // Next.js runtime — the `out/` directory can be served by anything.
  output: "export",

  // Static export has no image optimiser. The hero is pre-sized in the repo
  // instead (2048px, ~500KB) so nothing is served larger than it needs to be.
  images: { unoptimized: true },

  // Netlify serves /learn/ for /learn; matching that here keeps dev and
  // production on the same URLs.
  trailingSlash: true,
};

export default nextConfig;
