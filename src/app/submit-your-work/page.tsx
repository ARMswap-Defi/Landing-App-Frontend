import { imgPath } from "@/app/components/blog-card/blogCard";
import LeftColImage from "@/app/components/left-col-image/left-col-image";
import Banner from "@/app/components/pageBanner/banner";
import { Spinner } from "react-bootstrap";
import HeadingDescriptionCard from "../components/heading-description-card/heading-description-card";
import { fetchData } from "../_utils/ServerApis";
import { BannerData } from "../types/types";
import { Metadata } from "next";
import BlueCard from "../components/blue-bg-rouded-card/blue-bg-rounder-card";

export async function generateMetadata(): Promise<Metadata> {
  const MetaData: any = await fetchData("pool?populate[meta_tags]=*");

  const Metatag: any = MetaData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function SubmitYourWork() {
  let Data: any = null;
  try {
    const data: any = await fetchData(
      "submit-your-work?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[meta_tags]=*&populate[section_one][populate][cards][populate][link_buttons]=*&populate[section_one][populate][cards][populate][image]=*&populate[section_eleven][populate][image]=*&populate[section_twelve][populate][buttons]=*"
    );
    if (!data) {
      throw new Error("No data found");
    }
    Data = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3>No data found</h3>
      </div>
    );
  }
  if (!Data) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const bannerData: BannerData = Data.banner;
  const sectionOne: any = Data.section_one;
  const sectionEleven: any = Data.section_eleven;
  const sectionTwelve: any = Data.section_twelve;

  return (
    <>
      {bannerData ? (
        <div className="wrapped-gradient submit-your-work-banner">
          <Banner
            title={bannerData.title}
            description={bannerData.description}
            ImgURL={imgPath(bannerData.image.url)}
            bannerButtons={[]}
            unoptomize={false}
            height={bannerData.image.height}
            width={bannerData.image.width}
          />
        </div>
      ) : null}
      {sectionOne ? (
        <section className="py-[40px] max-[768px]:py-[40px] background-image-content ">
          <HeadingDescriptionCard
            title={sectionOne?.title}
            description={sectionOne?.description}
            xl={4}
            md={6}
            lg={4}
            sm={12}
            xs={12}
            cardsData={sectionOne?.cards}
            height={80}
            width={80}
            boderWidth={0}
            align="start"
            cardsBackground={"#fcfcfc"}
            headingColor="#101727"
            cardTitleClr={"#101828"}
            cardParagraphClr={"#101828"}
          />
        </section>
      ) : null}
  
      {sectionEleven && (
        <section className="py-[40px] bg-[#FCFCFD] wrapped-gradient">
          <LeftColImage
            primaryButtons={[]}
            borderButtons={[]}
            imgUrl={imgPath(sectionEleven?.image?.url)}
            title={sectionEleven?.heading}
            description={sectionEleven?.description}
          />
        </section>
      )}
      {sectionTwelve && (
        <section className=" ">
          <BlueCard
            title={sectionTwelve.heading}
            description={sectionTwelve.description}
            bannerButtons={sectionTwelve.buttons}
            target="_self"
          />
        </section>
      )}
    </>
  );
}
