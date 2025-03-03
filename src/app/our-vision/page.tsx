import { imgPath } from "@/app/components/blog-card/blogCard";
import LeftColImage from "@/app/components/left-col-image/left-col-image";
import Banner from "@/app/components/pageBanner/banner";
import RightColImage from "../components/right-col-image/right-col-iamge";
import { Spinner } from "react-bootstrap";
import BlueCard from "@/app/components/blue-bg-rouded-card/blue-bg-rounder-card";
import { fetchData } from "../_utils/ServerApis";
import { Metadata } from "next";
import { BannerData, ColImageSectionData } from "../types/types";

export async function generateMetadata(): Promise<Metadata> {
  const aboutData: any = await fetchData("our-vision?populate[meta_tags]=*");

  const Metatag: any = aboutData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function OurVision() {
  let OurVisionData: any = null;
  try {
    const data: any = await fetchData(
      "/our-vision?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[section_one][populate][image]=*&populate[section_two][populate][image]=*&populate[section_three][populate][image]=*&populate[section_four][populate][image]=*&populate[section_five][populate][image]=*&populate[section_six][populate][image]=*&populate[section_seven][populate][image]=*&populate[section_eight][populate][image]=*&populate[meta_tags]=*"
    );
    if (!data) {
      throw new Error("No data found");
    }
    OurVisionData = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3>No data found</h3>
      </div>
    );
  }
  if (!OurVisionData) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const bannerData: BannerData = OurVisionData.banner;
  const sectionOne: ColImageSectionData = OurVisionData.section_one;
  const sectionTwo: ColImageSectionData = OurVisionData.section_two;
  const sectionThree: ColImageSectionData = OurVisionData.section_three;
  const sectionFour: ColImageSectionData = OurVisionData.section_four;
  const sectionFive: ColImageSectionData = OurVisionData.section_five;
  const sectionSix: ColImageSectionData = OurVisionData.section_six;
  const sectionSeven: ColImageSectionData = OurVisionData.section_seven;
  const sectionEight = OurVisionData.section_eight;
  return (
    <>
      {bannerData ? (
        <div className="wrapped-gradient-banner our-vision-banner">
          <Banner
            title={bannerData.title}
            description={bannerData.description}
            ImgURL={imgPath(bannerData.image.url)}
            bannerButtons={[]}
            unoptomize={false}
            height={532}
            width={555}
          />
        </div>
      ) : null}

      {sectionOne && (
        <section className="bg-[#eff6fd] py-[40px] wrapped-gradient">
          <LeftColImage
            primaryButtons={[]}
            borderButtons={[]}
            imgUrl={imgPath(sectionOne?.image?.url)}
            title={sectionOne?.heading}
            description={sectionOne?.description}
          />
        </section>
      )}
      {sectionTwo && (
        <section className=" py-[40px] wrapped-gradient">
          <RightColImage
            primaryButtons={sectionTwo?.primary_buttons}
            borderButtons={[]}
            imgUrl={imgPath(sectionTwo?.image?.url)}
            title={sectionTwo?.heading}
            description={sectionTwo?.description}
          />
        </section>
      )}
      {sectionThree && (
        <section className="bg-[#eff6fd] py-[40px] wrapped-gradient">
          <LeftColImage
            primaryButtons={sectionThree?.primary_buttons}
            borderButtons={[]}
            imgUrl={imgPath(sectionThree?.image?.url)}
            title={sectionThree?.heading}
            description={sectionThree?.description}
          />
        </section>
      )}
      {sectionFour && (
        <section className=" py-[40px] wrapped-gradient">
          <RightColImage
            primaryButtons={sectionFour?.primary_buttons}
            borderButtons={[]}
            imgUrl={imgPath(sectionFour?.image?.url)}
            title={sectionFour?.heading}
            description={sectionFour?.description}
          />
        </section>
      )}
      {sectionFive && (
        <section className="bg-[#eff6fd] py-[40px] wrapped-gradient">
          <LeftColImage
            primaryButtons={sectionFive?.primary_buttons}
            borderButtons={[]}
            imgUrl={imgPath(sectionFive?.image?.url)}
            title={sectionFive?.heading}
            description={sectionFive?.description}
          />
        </section>
      )}
      {sectionSix && (
        <section className=" py-[40px] wrapped-gradient">
          <RightColImage
            primaryButtons={sectionSix?.primary_buttons}
            borderButtons={[]}
            imgUrl={imgPath(sectionSix?.image?.url)}
            title={sectionSix?.heading}
            description={sectionSix?.description}
          />
        </section>
      )}
      {sectionSeven && (
        <section className="bg-[#eff6fd] py-[40px] wrapped-gradient">
          <LeftColImage
            primaryButtons={sectionSeven?.primary_buttons}
            borderButtons={[]}
            imgUrl={imgPath(sectionSeven?.image?.url)}
            title={sectionSeven?.heading}
            description={sectionSeven?.description}
          />
        </section>
      )}
      {sectionEight && (
        <section className="py-[40px] ">
          <BlueCard
            target="_self"
            title={sectionEight?.heading}
            description={sectionEight?.description}
            bannerButtons={[]}
          />
        </section>
      )}
    </>
  );
}
