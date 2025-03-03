import LeftColImage from "../components/left-col-image/left-col-image";
import Banner from "../components/pageBanner/banner";
import { fetchData } from "../_utils/ServerApis";
import { imgPath } from "../components/blog-card/blogCard";
import HeadingDescriptionCard from "../components/heading-description-card/heading-description-card";
import RoadmapSection from "../components/roadmap/roadmap";
import { Metadata } from "next";
import { Spinner } from "react-bootstrap";
import RoadmapSectionMobile from "../components/roadmap-mobile/roadmap-mobile";
import FeatureBanner from "../components/feature-banner/featureBanner";

// This function fetches metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const MetaData: any = await fetchData("about?populate[meta_tag]=*");

  const Metatag: any = MetaData?.meta_tag || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function About() {

  let aboutData: any = null;

  try {
    const GrantsToken: any = await fetchData(
      "/about?populate[banner][populate][image]=*&populate[coin_heading_description]=*&populate[coins][populate][coin_image]=*&populate[banner][populate][buttons]=*&populate[armsp_token_roadmaps]=*&populate[transparancy][populate][image]=*&populate[transparancy][populate][primary_buttons]=*&populate[excellence_creativity][populate][cards][populate][image]=*&populate[roadmap][populate][roadmap_cards][populate][image]=*&populate[meta_tag]=*"
    );

    if (!GrantsToken) {
      throw new Error("No data found");
    }

    aboutData = GrantsToken;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3 className="text-[22px]">No data found</h3>
      </div>
    );
  }

  // If no data is loaded, render a spinner or skeleton
  if (!aboutData) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const armspTokenContent: any = aboutData?.armsp_token_roadmaps;
  const transparancy: any = aboutData?.transparancy;
  const Roadmap: any = aboutData?.roadmap;
  const CoinList: any = aboutData?.coin_heading_description;
  const Coins: any = aboutData?.coins;

  const ExcellenceCreativity: any = aboutData?.excellence_creativity;
  return (
    <>
      {aboutData?.banner && (
        <div className="wrapped-gradient-banner">
          <Banner
            title={aboutData.banner.title}
            description={aboutData.banner.description}
            ImgURL={imgPath(aboutData.banner.image.url)}
            bannerButtons={aboutData.banner.buttons}
            unoptomize={false}
            height={514}
            width={680}
          />
        </div>
      )}
      {armspTokenContent && <FeatureBanner roadmapData={armspTokenContent} />}
      <br />
      {transparancy && (
        <LeftColImage
          borderButtons={[]}
          primaryButtons={transparancy?.primary_buttons}
          imgUrl={imgPath(transparancy?.image?.url)}
          title={transparancy?.heading}
          description={transparancy?.description}
          // unoptomize={false}
        />
      )}
      {ExcellenceCreativity && (
        <section className="py-[80px] max-[768px]:py-[40px] bg-[#FCFCFD] ">
          <HeadingDescriptionCard
            title={ExcellenceCreativity?.title}
            description={ExcellenceCreativity?.description}
            xl={4}
            md={6}
            lg={4}
            sm={12}
            xs={12}
            cardsData={ExcellenceCreativity?.cards}
            height={80}
            width={80}
            boderWidth={0}
            align="start"
            cardsBackground={"#fff"}
            headingColor="#000000"
            cardTitleClr={"#101828"}
            cardParagraphClr={"#101828"}
          />
        </section>
      )}

      {Roadmap && (
        <section className="col-20 py-[80px]  max-[768px]:py-[40px] laptop">
          <RoadmapSection
            title={Roadmap?.heading}
            description={Roadmap?.description}
            roadmapCards={Roadmap?.roadmap_cards}
            col={3}
          />
        </section>
      )}
      {Roadmap && (
        <section className="col-20 py-[80px]  max-[768px]:py-[40px] mobile">
          <RoadmapSectionMobile
            title={Roadmap?.heading}
            description={Roadmap?.description}
            roadmapCards={Roadmap?.roadmap_cards}
            col={3}
          />
        </section>
      )}
    </>
  );
}
