import { fetchData } from "@/app/_utils/ServerApis";
import { imgPath } from "@/app/components/blog-card/blogCard";
import Banner from "@/app/components/pageBanner/banner";
import { Metadata } from "next";
import RightColImage from "../components/right-col-image/right-col-iamge";
import LeftColImage from "../components/left-col-image/left-col-image";
import BlueCard from "../components/blue-bg-rouded-card/blue-bg-rounder-card";
import { Spinner } from "react-bootstrap";

export async function generateMetadata(): Promise<Metadata> {
  const MetaData: any = await fetchData(
    "bug-bounty-program?populate[meta_tags]=*"
  );

  const Metatag: any = MetaData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function BugBountyProgram() {
  // const BugBountyData: any = await fetchData(
  //   "bug-bounty-program?populate=*,banner.image,rules_to_win_record.image,good_practices.image,working_with_us.image,support_our_efforts.image,support_our_efforts.border_buttons,armswap_secure_together.buttons"
  // );
  let BugBountyData: any = null;
  try {
    // const data: any = await fetchData(
    //   "bug-bounty-program?populate=*,banner.image,rules_to_win_record.image,good_practices.image,working_with_us.image,support_our_efforts.image,support_our_efforts.border_buttons,armswap_secure_together.buttons"
    // );
    // strapi 5
    const data: any = await fetchData(
      "/bug-bounty-program?populate[banner][populate][buttons]=*&populate[banner][populate][image]=*&populate[rules_to_win_record][populate][image]=*&populate[good_practices][populate][image]=*&populate[working_with_us][populate][image]=*&populate[support_our_efforts][populate][image]=*&populate[support_our_efforts][populate][border_buttons]=*&populate[armswap_secure_together][populate]=buttons"
    );
    if (!data) {
      throw new Error("No data found");
    }
    BugBountyData = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3 className="text-[22px]">No data found</h3>
      </div>
    );
  }
  if (!BugBountyData) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const support_our_efforts = BugBountyData.support_our_efforts;
  const rules_to_win_record = BugBountyData.rules_to_win_record;
  const good_practices = BugBountyData.good_practices;
  const working_with_us = BugBountyData.working_with_us;
  const armswap_secure_together = BugBountyData.armswap_secure_together;

  return (
    <>
      {BugBountyData?.banner && (
        <div className="wrapped-gradient-banner bug-bounty-banner">
          <Banner
            title={BugBountyData.banner.title}
            description={BugBountyData.banner.description}
            ImgURL={imgPath(BugBountyData.banner.image.url)}
            bannerButtons={BugBountyData.banner.buttons}
            unoptomize={false}
            height={570}
            width={623}
          />
        </div>
      )}
      {support_our_efforts && (
        <div className="wrapped-gradient py-[40px] margin-h4 anchor-primary">
          <LeftColImage
            borderButtons={support_our_efforts.border_buttons}
            primaryButtons={support_our_efforts.primary_buttons}
            imgUrl={imgPath(support_our_efforts.image.url)}
            title={support_our_efforts.heading}
            description={support_our_efforts.description}
          />
        </div>
      )}
      {rules_to_win_record && (
        <div className="background-image-content py-[40px] wrapped-gradient">
          <RightColImage
            borderButtons={rules_to_win_record.border_buttons}
            primaryButtons={rules_to_win_record.primary_buttons}
            imgUrl={imgPath(rules_to_win_record.image.url)}
            title={rules_to_win_record.heading}
            description={rules_to_win_record.description}
          />
        </div>
      )}
      {good_practices && (
        <div className="wrapped-gradient py-[40px]">
          <LeftColImage
            borderButtons={good_practices.border_buttons}
            primaryButtons={good_practices.primary_buttons}
            imgUrl={imgPath(good_practices.image.url)}
            title={good_practices.heading}
            description={good_practices.description}
          />
        </div>
      )}
      {working_with_us && (
        <div className="background-image-content py-[40px] wrapped-gradient">
          <RightColImage
            borderButtons={working_with_us.border_buttons}
            primaryButtons={working_with_us.primary_buttons}
            imgUrl={imgPath(working_with_us.image.url)}
            title={working_with_us.heading}
            description={working_with_us.description}
          />
        </div>
      )}
      <BlueCard
        title={armswap_secure_together.heading}
        description={armswap_secure_together.description}
        bannerButtons={armswap_secure_together.buttons}
        target="_blank"
      />
    </>
  );
}
