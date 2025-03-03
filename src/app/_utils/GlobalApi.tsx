import axios from "axios";
//Live server key
const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/`,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});
//Local server key
// const API_KEY =
//   "3d0eaddae1512a13c7a0f51be287f541a25d91f108dfe20e0dd475063234b19ba1709bdba9089643e515dfd715f1126b9fd601f424703079a12fd6d47d0626574000500e5f9a77ed237a260845a248b2a3e90c69baedda3656de4abc36c9cf0528737688d4f1abfb135f9d1d5a1affe2a3c75f297cd33f1d7ea17ee31680a993";
// const axiosClient = axios.create({
//   baseURL: `http://localhost:1337/api`,
//   headers: {
//     Authorization: `Bearer ${API_KEY}`,
//   },
// });

const GetCategoriesTabs = () => axiosClient.get("/categories");
// const GetBlogs = () => axiosClient.get("/blogs?populate=*&sort[0]=publishedAt:desc");
const GetBlogs = (page: number = 1) =>
  axiosClient.get(
    `/blogs?populate=*&sort[0]=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=9`
  );
// const GetSelectedBlogs = (category: string) =>
//   axiosClient.get(
//     `/blogs?filters[categories][name][$in]=${category}&populate=*`
//   );
  const GetSelectedBlogs = (category: string, page: number = 1) =>
  axiosClient.get(
    `/blogs?filters[categories][name][$in]=${category}&populate=*&pagination[page]=${page}&pagination[pageSize]=9`
  );
const GetTrendingBlogs = () =>
  axiosClient.get("/blogs?filters[is_trending][$eq]=true&populate=*");
const GetGovernancePageContent = () =>
  axiosClient.get(
    "/governance?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[the_armswap_coin][populate][image]=*&populate[tabs]=*&populate[the_governance_apps][populate][cards][populate][link_buttons]=*&populate[the_governance_apps][populate][cards][populate][image]=*&populate[meta_tags]=*"
  );
const GetPrivacyPolicy = () =>
  axiosClient.get(
    "/privacy-policy?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[meta_tag]=*"
  );
const GetTermCondition = () =>
  axiosClient.get(
    "/term-and-condition?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[meta_tags]=*"
  );
const GetCookiesPolicy = () =>
  axiosClient.get(
    "/cookies-policy?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[meta_tags]=*"
  );
const GetKnowledgeBaseBanner = () =>
  axiosClient.get(
    "/knowledge-base?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[tab_knowledgebases][populate][image]=*&populate[meta_tags]=*"
  );

const GetBridgeData = () =>
  axiosClient.get(
    "bridge?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[tabs]=*&populate[how_it_works][populate][cards][populate][image]=*&populate[meta_tag]=*"
  );
const GetCoverageData = () =>
  axiosClient.get(
    "/coverage-page?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[coins][populate][coin_image]=*&populate[meta_tags]=*"
  );

const GetFooterData = () =>
  axiosClient.get(
    "arm-swap-footer?populate[socialmedias][populate][image]=*&populate[footer_links][populate][sub_category]=*"
  );
const GetTokenData = () =>
  axiosClient.get(
    "token?populate[tokens_address][populate][coins][populate]=image&populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[faqs]=*&populate[armswap_fairy_launch][populate]=image&populate[armswap_allocation][populate]=image&populate[armsp_token_roadmaps]=*&populate[meta_tags]=*"
  );
const GetPoolData = () =>
  axiosClient.get(
    "/pool?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[section_one][populate][image]=*&populate[section_two][populate][image]=*&populate[coins][populate][coin_image]=*&populate[how_to_add_liquidity][populate][cards][populate][image]=*&populate[how_to_add_liquidity][populate][cards][populate][link_buttons]=*&populate[meta_tags]=*"
  );
const GetSubmitYourWorkData = () =>
  axiosClient.get(
    "/submit-your-work?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[section_one][populate][image]=*&populate[section_two][populate][image]=*&populate[section_three][populate][image]=*&populate[section_four][populate][cards][populate][image]=*&populate[section_five][populate][cards][populate][link_buttons]=*&populate[meta_tags]=*"
  );

const GetSlectedCategory = (slug: string) =>
  axiosClient.get(`/tab-knowledgebases?filters[slug][$eq]=${slug}`);

const GetSlectedCategoryArticles = (slug: string) =>
  axiosClient.get(
    `/article-knowledgebases?filters[category][slug][$eq]=${slug}`
  );

const GetSlectedArticle = (slug: string) =>
  axiosClient.get(
    `/article-knowledgebases?filters[slug][$eq]=${slug}&populate[image]=*`
  );

const GetPopularArticles = () =>
  axiosClient.get(`/article-knowledgebases?filters[isPopular][$eq]=true`);

const GetWhitepaper = () => axiosClient.get("/whitepaper?populate=pdf_file");
const GetAudit = () => axiosClient.get("/audit?populate=pdf_file");

const GetVisionData = () =>
  axiosClient.get(
    "/our-vision?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[section_one][populate][image]=*&populate[section_two][populate][image]=*&populate[section_three][populate][image]=*&populate[section_four][populate][image]=*&populate[section_five][populate][image]=*&populate[section_six][populate][image]=*&populate[section_seven][populate][image]=*&populate[section_eight][populate][image]=*&populate[meta_tags]=*"
  );
const GetFeatureData = () =>
  axiosClient.get(
    "/armswap-feature?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[meta_tags]=*&populate[section_one][populate][image]=*&populate[section_two][populate][image]=*&populate[section_three][populate][image]=*&populate[section_four][populate][cards][populate][image]=*"
  );
const GetRestrictedCountries = () =>
  axiosClient.get("/restricted-countries?pagination[limit]=100");
const GetRestrictedCountriesContent = () =>
  axiosClient.get(
    "/restrict-country?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[meta_tags]=*"
  );

const GetarticleKnowlwdgebaseList = () =>
  axiosClient.get("/article-knowledgebases?populate=*");
const GetBlogsList = () => axiosClient.get("/blogs?populate=*");
export default {
  GetBlogsList,
  GetarticleKnowlwdgebaseList,
  GetRestrictedCountriesContent,
  GetRestrictedCountries,
  GetAudit,
  GetFeatureData,
  GetCookiesPolicy,
  GetVisionData,
  GetWhitepaper,
  GetCategoriesTabs,
  GetPopularArticles,
  GetSlectedArticle,
  GetSlectedCategoryArticles,
  GetSubmitYourWorkData,
  GetSlectedCategory,
  GetBlogs,
  GetSelectedBlogs,
  GetTrendingBlogs,
  GetGovernancePageContent,
  GetPrivacyPolicy,
  GetKnowledgeBaseBanner,
  GetPoolData,
  GetBridgeData,
  GetCoverageData,
  GetFooterData,
  GetTermCondition,
  GetTokenData,
};
