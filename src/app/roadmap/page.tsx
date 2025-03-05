import Banner from "../components/pageBanner/banner";
import LeftColImage from "@/app/components/left-col-image/left-col-image";
import RightColImage from "@/app/components/right-col-image/right-col-iamge";
import {  Spinner } from "react-bootstrap";
import { fetchData } from "@/app/_utils/ServerApis";
import { imgPath } from "@/app/components/blog-card/blogCard";
import RoadmapSection from "@/app/components/roadmap/roadmap";
import { Metadata } from "next";
import { ColImageSectionData } from "../types/types";
import RoadmapSectionMobile from "../components/roadmap-mobile/roadmap-mobile";

// This function fetches metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const aboutData: any = await fetchData("roadmap?populate=meta_tags");

  const Metatag: any = aboutData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
  };
}
export default async function Roadmap() {
  let roadmapData: any = null;
  try {
    const data: any = await fetchData(
      "roadmap?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[expanding_coverage][populate][image]=*&populate[armswap_ecosystem][populate][cards][populate][image]=*&populate[ecosystem_vision][populate][image]=*&populate[ecosystem_vision][populate][border_buttons]=*&populate[crosschain_infra][populate][image]=*&populate[become_sustainable][populate][image]=*&populate[roadmap_first][populate][roadmap_cards][populate][image]=*&populate[roadmap_second][populate][roadmap_cards][populate][image]=*"
    );
    if (!data) {
      throw new Error("No data found");
    }
    roadmapData = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3>No data found</h3>
      </div>
    );
  }
  if (!roadmapData) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const armswapEcosystem: any = roadmapData.armswap_ecosystem;
  const ecoSystemVision: any = roadmapData.ecosystem_vision;
  const infrastructure: ColImageSectionData = roadmapData.crosschain_infra;
  const becomeSustainable: ColImageSectionData = roadmapData.become_sustainable;
  const roadmapFirst: any = roadmapData.roadmap_first;
  const roadmapSecond: any = roadmapData.roadmap_second;
  const expandingCoverage: ColImageSectionData = roadmapData.expanding_coverage;

  return (
    <>
      {roadmapData?.banner && (
        <div className="wrapped-gradient-banner roadmap-banner">
          <Banner
            title={roadmapData.banner.title}
            description={roadmapData.banner.description}
            ImgURL={imgPath(roadmapData.banner.image.url)}
            bannerButtons={[]}
            unoptomize={false}
            height={500}
            width={roadmapData?.banner.image.width}
          />
        </div>
      )}
      {ecoSystemVision && (
        <div className="blue-tick-bullets py-[40px]">
          <LeftColImage
            imgUrl={imgPath(ecoSystemVision.image.url)}
            title={ecoSystemVision.heading}
            description={ecoSystemVision.description}
            borderButtons={ecoSystemVision.border_buttons}
            primaryButtons={[]}
          />
        </div>
      )}
      {infrastructure && (
        <div className="background-image-content py-[40px]">
          <RightColImage
            borderButtons={[]}
            primaryButtons={[]}
            imgUrl={imgPath(infrastructure.image.url)}
            title={infrastructure.heading}
            description={infrastructure.description}
          />
        </div>
      )}
      {becomeSustainable && (
        <div className="blue-tick-bullets py-[40px]">
          <LeftColImage
            borderButtons={[]}
            primaryButtons={[]}
            imgUrl={imgPath(becomeSustainable.image.url)}
            title={becomeSustainable.heading}
            description={becomeSustainable.description}
          />
        </div>
      )}
      {roadmapFirst && (
        <section className="background-image-content py-[80px] max-[768px]:py-[40px] laptop">
          <RoadmapSection
            title={roadmapFirst.heading}
            description={roadmapFirst.description}
            roadmapCards={roadmapFirst.roadmap_cards}
            col={2}
          />
        </section>
      )}
      {roadmapFirst && (
        <section className="background-image-content py-[80px] max-[768px]:py-[40px] mobile">
          <RoadmapSectionMobile
            title={roadmapFirst.heading}
            description={roadmapFirst.description}
            roadmapCards={roadmapFirst.roadmap_cards}
            col={2}
          />
        </section>
      )}
      {roadmapSecond && (
        <section className="py-[80px] max-[768px]:py-[40px] roadmap laptop">
          <RoadmapSection
            title={roadmapSecond?.heading}
            description={roadmapSecond?.description}
            roadmapCards={roadmapSecond?.roadmap_cards}
            col={3}
          />
        </section>
      )}
      {roadmapSecond && (
        <section className="py-[80px] max-[768px]:py-[40px] roadmap mobile">
          <RoadmapSectionMobile
            title={roadmapSecond?.heading}
            description={roadmapSecond?.description}
            roadmapCards={roadmapSecond?.roadmap_cards}
            col={3}
          />
        </section>
      )}
      
      {expandingCoverage && (
        <section className="background-image-content">
           <br className="hidden max-[768px]:block" />
          <LeftColImage
            borderButtons={[]}
            primaryButtons={[]}
            imgUrl={imgPath(expandingCoverage.image.url)}
            title={expandingCoverage.heading}
            description={expandingCoverage.description}
          />
        </section>
      )}
      {/* <section className="bg-[#FCFCFD] py-[40px]">
        <HeadingDescriptionCard
          title={armswapEcosystem.title}
          description={armswapEcosystem.description}
          xl={3}
          md={3}
          lg={3}
          sm={12}
          xs={12}
          cardsData={armswapEcosystem.cards}
          height={80}
          width={80}
          boderWidth={0}
          align="start"
          cardsBackground={"#fff"}
          headingColor="#000000"
          cardTitleClr={"#101828"}
          cardParagraphClr={"#101828"}
        />
      </section> */}
    </>
  );
}
