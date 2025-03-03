/** @type {import('next').NextConfig} */
import axios from "axios";

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["backend.armswap.com", "192.168.100.108"], // Alternative to remotePatterns
    remotePatterns: [
      {
        protocol: "http",
        hostname: "backend.armswap.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "192.168.100.108",
        port: "1337",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.100.108",
        port: "1337",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    // Fetch the routes dynamically from Strapi with token for redirects
    const routes = await fetchRoutesWithToken();
    // console.log("Redirect Routes", routes);
    const specificRedirects = [
      {
        source: "/knowledge-base",
        destination: "https://docs.armswap.com/",
        permanent: true,
      },
      // {
      //   source: "https://docs.armswap.com/features",
      //   destination: "https://docs.armswap.com/",
      //   permanent: true,
      // },
      // {
      //   source: "https://docs.armswap.com/product",
      //   destination: "https://docs.armswap.com/",
      //   permanent: true,
      // },
      // {
      //   source: "https://docs.armswap.com/pricing",
      //   destination: "https://docs.armswap.com/",
      //   permanent: true,
      // },
      {
        source: "/knowledge-base/arm-swap-grants/what-is-arm-swap-tokenomics",
        destination: "https://armswap.com/",
        permanent: true,
      },
      {
        source: "/knowledge-base/arm-swap-grants/what-is-arm-swap-token",
        destination: "https://armswap.com/",
        permanent: true,
      },
      {
        source: "/knowledge-base/arm-swap-roadmap/what-are-arm-swap-grants",
        destination: "https://armswap.com/",
        permanent: true,
      },
      {
        source: "/knowledge-base/arm-swap-tokenomics",
        destination: "https://armswap.com/",
        permanent: true,
      },
      {
        source:
          "/knowledge-base/what-is-arm-swap-token/what-is-arm-swap-tokenomics",
        destination: "https://armswap.com/",
        permanent: true,
      },
      {
        source:
          "/knowledge-base/what-is-arm-swap-token/what-are-arm-swap-grants",
        destination: "https://armswap.com/",
        permanent: true,
      },
      {
        source:
          "/knowledge-base/what-is-arm-swap-roadmap/what-is-arm-swap-tokenomics",
        destination: "https://armswap.com/",
        permanent: true,
      },
      {
        source: "/knowledge-base/arm-swap-token/what-are-arm-swap-grants",
        destination: "https://armswap.com/grants",
        permanent: true,
      },
      {
        source:
          "/knowledge-base/what-is-arm-swap-roadmap/what-are-arm-swap-grants",
        destination: "https://armswap.com/grants",
        permanent: true,
      },
      {
        source: "/knowledge-base/what-is-arm-swap-token/what-is-arm-swap-token",
        destination: "https://armswap.com/armsp-token",
        permanent: true,
      },
      {
        source: "/knowledge-base/arm-swap-roadmap/what-is-arm-swap-tokenomics",
        destination: "https://armswap.com/",
        permanent: true,
      },
      {
        source:
          "/knowledge-base/what-are-arm-swap-grants/what-is-arm-swap-roadmap",
        destination: "https://armswap.com/roadmap",
        permanent: true,
      },
      {
        source:
          "/knowledge-base/what-is-arm-swap-roadmap/what-is-arm-swap-roadmap",
        destination: "https://armswap.com/roadmap",
        permanent: true,
      },
      {
        source: "/knowledge-base/getting-started/what-is-arm-swap-roadmap",
        destination: "https://armswap.com/roadmap",
        permanent: true,
      },
      {
        source: "/knowledge-base/arm-swap-roadmap/what-is-arm-swap-token",
        destination: "https://armswap.com/roadmap",
        permanent: true,
      },
      {
        source: "/knowledge-base/arm-swap-roadmap/what-is-arm-swap-roadmap",
        destination: "https://armswap.com/roadmap",
        permanent: true,
      },
      {
        source: "/knowledge-base/arm-swap-roadmap",
        destination: "https://armswap.com/roadmap",
        permanent: true,
      },
      {
        source: "/knowledge-base/arm-swap-grants/what-is-arm-swap-roadmap",
        destination: "https://armswap.com/roadmap",
        permanent: true,
      },
      {
        source: "/knowledge-base/getting-started/what-is-arm-swap-token",
        destination: "https://armswap.com/armsp-token",
        permanent: true,
      },
      {
        source: "/knowledge-base/arm-swap-token/what-is-arm-swap-token",
        destination: "https://armswap.com/armsp-token",
        permanent: true,
      },
      {
        source: "/knowledge-base/arm-swap-token/what-is-arm-swap-tokenomics",
        destination: "https://armswap.com/armsp-token",
        permanent: true,
      },
      {
        source:
          "/knowledge-base/what-is-arm-swap-tokenomics/what-is-arm-swap-token",
        destination: "https://armswap.com/armsp-token",
        permanent: true,
      },
      {
        source:
          "/knowledge-base/what-is-arm-swap-token/what-is-arm-swap-roadmap",
        destination: "https://armswap.com/roadmap",
        permanent: true,
      },
      {
        source: "/knowledge-base/what-is-arm-swap-token",
        destination: "https://armswap.com/armsp-token",
        permanent: true,
      },
      {
        source: "/knowledge-base/arm-swap-token",
        destination: "https://armswap.com/armsp-token",
        permanent: true,
      },
      {
        source: "/media-query",
        destination: "https://armswap.com/",
        permanent: true,
      },
      {
        source: "/uploads/images_1_2d701499dc.jfif",
        destination: "https://armswap.com/",
        permanent: true,
      },
      {
        source: "/uploads/thumbnail_images_76c3b3e1c3.jfif",
        destination: "https://armswap.com/",
        permanent: true,
      },
      {
        source: "/uploads/images_76c3b3e1c3.jfif",
        destination: "https://armswap.com/",
        permanent: true,
      },
      {
        source: "/armswap-token",
        destination: "https://armswap.com/armsp-token",
        permanent: true,
      },
      {
        source: "/knowledge-base/getting-started",
        destination: "https://docs.armswap.com/",
        permanent: true,
      },
      {
        source: "/knowledge-base/arm-swap-token/what-is-arm-swap-roadmap",
        destination: "https://docs.armswap.com/",
        permanent: true,
      },
      {
        source: "/knowledge-base/arm-swap-grants/what-are-arm-swap-grants",
        destination: "https://docs.armswap.com/ARMswap/armswap-grants",
        permanent: true,
      },
    ];

    const domainRedirect = {
      source: "/:path*",
      has: [
        {
          type: "host",
          value: "https://www.armswap.com",
        },
        {
          type: "host",
          value: "http://armswap.com",
        },
      ],
      destination: "https://armswap.com/:path*",
      permanent: true,
    };

    return [domainRedirect, ...specificRedirects, ...routes]; // Returning redirects dynamically
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://192.168.100.166:8080/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

// Fetch routes from Strapi
async function fetchRoutesWithToken() {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN; // Token should be stored in .env.local

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/redirect-301s?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in headers
        },
      }
    );

    const routes = response?.data?.data
      ?.map((route) => ({
        source: route?.source,
        destination: route?.destination,
        permanent: !!route?.permanent || false, // Set to false if undefined
      }))
      .filter((route) => route.source && route.destination);

    return routes;
  } catch (error) {
    console.error("Error fetching routes:", error);
    return [];
  }
}

export default nextConfig;
