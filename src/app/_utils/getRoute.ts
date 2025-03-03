import GlobalApi from "./GlobalApi";

export async function getDynamicRoutes() {
  // Example function to fetch dynamic routes
  // Replace this with actual logic to fetch routes

  let articles: any = [];
  try {
    // Fetch all articles (removing the 25 limit)
    const resp = await GlobalApi.GetarticleKnowlwdgebaseList();

    // Assign the articles data to your variable
    articles = resp?.data?.data;
    // Assuming articles have a `slug` field for URL
    const blogRoutes = articles.map((article: any) => {
      return `${process.env.NEXT_PUBLIC_STRAPI_URL}/learn/blogs/${article.categoryslug}/${article.slug}`;
    });
    return blogRoutes;
  } catch (error) {
    console.error("Error fetching articles from Strapi:", error);
    return [];
  }
}
