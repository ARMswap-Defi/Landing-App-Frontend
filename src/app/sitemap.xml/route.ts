import { NextRequest, NextResponse } from "next/server";
import GlobalApi from "../_utils/GlobalApi";
export async function GET(req: NextRequest) {
  // Define static routes
  const staticRoutes = [
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/armsp-token`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/armswap-features`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/pdf/audit-report.pdf`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/how-to-buy-armsp-coin`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/roadmap`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/grants`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/governance`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/pdf/whitepaper.pdf`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/restricted-countries`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/partner-with-armswap`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/armswap-mobile-app`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/armswap-affiliated-projects`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/our-coverage`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/about-us`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/contact-us`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/privacy-policy`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/armswap-security`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/armswap-transparency`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/meet-the-team`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/armswap-pools`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/our-vision`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/bridge-your-token`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/armsp-token`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/bug-bounty-program`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/learn/blogs`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/submit-your-work`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/media-query`,
      lastmod: new Date().toISOString(),
      changefreq: "Always",
      priority: 0.8,
    },
    // Add more static routes here
  ];

  let blogs: any = [];
  // Fetch all articles (removing the 25 limit)
  const respBlog = await GlobalApi.GetBlogsList();

  // Assign the articles data to your variable
  blogs = respBlog?.data?.data;
  // Assuming articles have a `slug` field for URL
  const blogRoutes = blogs.map((article: any) => {
    return {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/learn/blogs/${article.slug}`,
      lastmod: article.updatedAt, // You can replace this with actual `updatedAt` or `createdAt` if available
      changefreq: "always",
      priority: 0.8,
    };
  });

  // Combine static and dynamic routes
  const allRoutes = [...staticRoutes, ...blogRoutes];

  // Generate XML content
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allRoutes
        .map(
          (route) => `
        <url>
          <loc>${route.loc}</loc>
          <lastmod>${route.lastmod}</lastmod>
          <changefreq>always</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join("")}
    </urlset>
  `;
  return new NextResponse(xmlContent, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
