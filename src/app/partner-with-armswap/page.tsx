import { Spinner } from "react-bootstrap";
import LeftColImage from "../components/left-col-image/left-col-image";
import Banner from "../components/pageBanner/banner";
import BlueCard from "../components/blue-bg-rouded-card/blue-bg-rounder-card";
import { fetchData } from "../_utils/ServerApis";
import { imgPath } from "../components/blog-card/blogCard";

interface howItWorksType {
  title: string;
  description: string;
  link: string;
  imgUrl: string;
}

import { Metadata } from "next";
import { ColImageSectionData } from "../types/types";
import RightColImage from "../components/right-col-image/right-col-iamge";

// This function fetches metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const aboutData: any = await fetchData("partner?populate[meta_tags]=*");

  const Metatag: any = aboutData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function Partners() {
  // const partnerData: any = await fetchData(
  //   "partner?populate=*,banner.image,banner.buttons,boost_liquidity.image,collaboration_with_ARMSwap.image,get_token_list.buttons.title"
  // );
  let partnerData: any = null;
  try {
    const data: any = await fetchData(
      "/partner?populate[meta_tags]=*&populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[boost_liquidity][populate][image]=*&populate[collaboration_with_ARMSwap][populate][image]=*&populate[get_token_list][populate][buttons]=*"
    );
    if (!data) {
      throw new Error("No data found");
    }
    partnerData = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3>No data found</h3>
      </div>
    );
  }
  if (!partnerData) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const BannerData: any = partnerData?.banner;
  const BoostLiquidity: ColImageSectionData = partnerData?.boost_liquidity;
  const CollaborationWithARMSwap: ColImageSectionData =
    partnerData?.collaboration_with_ARMSwap;
  const getTokenList: any = partnerData?.get_token_list;

  return (
    <>
      {partnerData?.banner && (
        <div className="wrapped-gradient-banner partner-banner">
          <Banner
            title={partnerData?.banner.title}
            description={partnerData.banner?.description}
            ImgURL={imgPath(BannerData?.image?.url)}
            bannerButtons={[]}
            unoptomize={false}
            height={BannerData?.image?.height}
            width={BannerData?.image?.width}
          />
        </div>
      )}

    
      {CollaborationWithARMSwap && (
        <div className="blue-tick-bullets py-[40px] colloboration-with-armswap">
          <LeftColImage
            borderButtons={[]}
            primaryButtons={[]}
            title={CollaborationWithARMSwap.heading}
            description={CollaborationWithARMSwap.description}
            imgUrl={imgPath(CollaborationWithARMSwap?.image?.url)}
          />
        </div>
      )}
        {BoostLiquidity && (
          <section className="bg-[#eff6fd] py-[40px] wrapped-gradient">
     <RightColImage
          borderButtons={[]}
          primaryButtons={[]}
          title={BoostLiquidity.heading}
          description={BoostLiquidity.description}
          imgUrl={imgPath(BoostLiquidity?.image?.url)}
        />
          </section>
   
      )}
    
        {getTokenList && (
        <BlueCard
          title={getTokenList.title}
          description={getTokenList.description}
          bannerButtons={getTokenList.buttons}
          target="_self"
        />
      )}
    </>
  );
}
