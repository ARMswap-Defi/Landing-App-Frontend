import { fetchData } from "@/app/_utils/ServerApis";
import { imgPath } from "@/app/components/blog-card/blogCard";
import BlueCard from "@/app/components/blue-bg-rouded-card/blue-bg-rounder-card";
import HeadingDescriptionCard from "@/app/components/heading-description-card/heading-description-card";
import LeftColImage from "@/app/components/left-col-image/left-col-image";
import Banner from "@/app/components/pageBanner/banner";
import RightColImage from "@/app/components/right-col-image/right-col-iamge";
import { Metadata } from "next";
import { Spinner } from "react-bootstrap";
export async function generateMetadata(): Promise<Metadata> {
  const MetaData: any = await fetchData(
    "armswap-transparency?populate[meta_tags]=*"
  );

  const Metatag: any = MetaData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
  
  };
}
export default async function ArmswapTransparency() {

  let armswapTransparencyData: any = null;
  try {

    const data: any = await fetchData(
      "/armswap-transparency?populate[banner][populate][image]=*&populate[open_honest_communication][populate][cards][populate][image]=*&populate[governance_decision_making][populate][image]=*&populate[financial_transparency][populate][image]=*&populate[ethical_practice][populate][image]=*&populate[highlight_box][populate][buttons]=*"
    );

    if (!data) {
      throw new Error("No data found");
    }
    armswapTransparencyData = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3 className="text-[22px]">No data found</h3>
      </div>
    );
  }
  if (!armswapTransparencyData) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const OpenHonestCommunication =
    armswapTransparencyData.open_honest_communication;
  const governance_decision_making =
    armswapTransparencyData.governance_decision_making;
  const financial_transparency = armswapTransparencyData.financial_transparency;
  const ethical_practice = armswapTransparencyData.ethical_practice;
  const BlueCardData = armswapTransparencyData.highlight_box;
  return (
    <>
      {armswapTransparencyData?.banner && (
        <div className="wrapped-gradient-banner">
          <Banner
            title={armswapTransparencyData.banner.title}
            description={armswapTransparencyData.banner.description}
            ImgURL={imgPath(armswapTransparencyData.banner.image.url)}
            bannerButtons={[]}
            unoptomize={false}
            height={armswapTransparencyData.banner.image.height}
            width={armswapTransparencyData.banner.image.width}
          />
        </div>
      )}
      {OpenHonestCommunication && (
        <div className="py-[40px] background-image-content">
          <HeadingDescriptionCard
            title={OpenHonestCommunication.title}
            description={OpenHonestCommunication.description}
            xl={3}
            md={6}
            lg={3}
            sm={12}
            xs={12}
            cardsData={OpenHonestCommunication.cards}
            height={56}
            width={56}
            boderWidth={0}
            align="start"
            cardsBackground={"#EFF6FD"}
            headingColor="#000000"
            cardTitleClr={"#101828"}
            cardParagraphClr={"#101828"}
          />
        </div>
      )}
      {governance_decision_making && (
        <div className="wrapped-gradient py-[40px]">
          <LeftColImage
            borderButtons={governance_decision_making.border_buttons}
            primaryButtons={governance_decision_making.primary_buttons}
            imgUrl={imgPath(governance_decision_making.image.url)}
            title={governance_decision_making.heading}
            description={governance_decision_making.description}
          />
        </div>
      )}
      {financial_transparency && (
        <div className="background-image-content py-[40px] wrapped-gradient">
          <RightColImage
            borderButtons={financial_transparency.border_buttons}
            primaryButtons={financial_transparency.primary_buttons}
            imgUrl={imgPath(financial_transparency.image.url)}
            title={financial_transparency.heading}
            description={financial_transparency.description}
          />
        </div>
      )}

      {ethical_practice && (
        <div className=" py-[40px] wrapped-gradient">
          <LeftColImage
            borderButtons={ethical_practice.border_buttons}
            primaryButtons={ethical_practice.primary_buttons}
            imgUrl={imgPath(ethical_practice.image.url)}
            title={ethical_practice.heading}
            description={ethical_practice.description}
          />
        </div>
      )}
      {BlueCardData && (
        <BlueCard
          title={BlueCardData.heading}
          description={BlueCardData.description}
          bannerButtons={BlueCardData.buttons}
          target="_self"
        />
      )}
    </>
  );
}
