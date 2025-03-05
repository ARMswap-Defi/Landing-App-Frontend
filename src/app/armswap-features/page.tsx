
import { imgPath } from "@/app/components/blog-card/blogCard";
import LeftColImage from "@/app/components/left-col-image/left-col-image";
import Banner from "@/app/components/pageBanner/banner";
import RightColImage from "../components/right-col-image/right-col-iamge";
import HeadingDescriptionCard from "../components/heading-description-card/heading-description-card";
import {  Spinner } from "react-bootstrap";
import { BannerData, ColImageSectionData } from "../types/types";
import { fetchData } from "../_utils/ServerApis";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const aboutData: any = await fetchData(
    "/armswap-feature?populate[meta_tags]=*"
  );

  const Metatag: any = aboutData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function ArswapFeatures() {
  let FeatureData: any = null;
  try {
    const data: any = await fetchData(
      "/armswap-feature?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[meta_tags]=*&populate[section_one][populate][image]=*&populate[section_one][populate][primary_buttons]=*&populate[section_two][populate][image]=*&populate[section_two][populate][primary_buttons]=*&populate[section_three][populate][image]=*&populate[section_four][populate][cards][populate][image]=*"
    );
    if (!data) {
      throw new Error("No data found");
    }
    FeatureData = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3 className="text-[22px]">No data found</h3>
      </div>
    );
  }
  if (!FeatureData) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const bannerData: BannerData = FeatureData.banner;

  const sectionOne: ColImageSectionData = FeatureData.section_one;
  const sectionTwo: ColImageSectionData = FeatureData.section_two;
  const sectionThree: ColImageSectionData = FeatureData.section_three;
  const sectionFour = FeatureData.section_four;
  return (
    <>
      {bannerData ? (
        <div className="wrapped-gradient-banner">
          <Banner
            title={bannerData.title}
            description={bannerData.description}
            ImgURL={imgPath(bannerData.image.url)}
            bannerButtons={[]}
            unoptomize={false} 
            height={608} 
            width={577}          
            />
        </div>
      ) : null}

      {sectionOne ? (
        <section className="bg-[#eff6fd] py-[40px] wrapped-gradient">
          <LeftColImage
            primaryButtons={sectionOne.primary_buttons}
            borderButtons={[]}
            imgUrl={imgPath(sectionOne?.image?.url)}
            title={sectionOne?.heading}
            description={sectionOne?.description}
          />
        </section>
      ) : null}
      {sectionTwo ? (
        <section className=" py-[40px] wrapped-gradient">
          <RightColImage
            primaryButtons={sectionTwo?.primary_buttons}
            borderButtons={[]}
            imgUrl={imgPath(sectionTwo?.image?.url)}
            title={sectionTwo?.heading}
            description={sectionTwo?.description}
          />
        </section>
      ) : null}
      {sectionThree ? (
        <section className="bg-[#eff6fd] py-[40px] wrapped-gradient">
          <LeftColImage
            primaryButtons={sectionThree?.primary_buttons}
            borderButtons={[]}
            imgUrl={imgPath(sectionThree?.image?.url)}
            title={sectionThree?.heading}
            description={sectionThree?.description}
          />
        </section>
      ) : null}
      {sectionFour ? (
        <section className=" py-[40px]">
          <HeadingDescriptionCard
            title={sectionFour.title}
            description={sectionFour.description}
            xl={3}
            md={6}
            lg={3}
            sm={12}
            xs={12}
            cardsData={sectionFour.cards}
            height={56}
            width={56}
            boderWidth={1}
            align="start"
            cardsBackground={"#EFF6FD"}
            headingColor="#000000" cardTitleClr={"#101828"} cardParagraphClr={"#101828"}    
          />
        </section>
      ) : null}
    </>
  );
}
