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
    "armswap-security?populate[meta_tags]=*"
  );

  const Metatag: any = MetaData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function ArmswapSecurity() {
  // const armswapSecurityData: any = await fetchData(
  //   ""
  // );
  let armswapSecurityData: any = null;
  try {
    // strapi 4
    // const data: any = await fetchData(
    //   "armswap-security?populate=*,banner.image,secure_multi_party_computation.image,how_smpc_works.cards.image,the_armswap_router.image,decentralized_network_trustless_transactions.image,advanced_encryption_security_protocols.image,commitment_continuous_improvement.image,user_responsibility_best_practices.image,highlight_box.buttons"
    // );

    // Strapi 5
    const data: any = await fetchData(
      "/armswap-security?populate[banner][populate][image]=*&populate[secure_multi_party_computation][populate][image]=*&populate[how_smpc_works][populate][cards][populate][image]=*&populate[the_armswap_router][populate][image]=*&populate[decentralized_network_trustless_transactions][populate][image]=*&populate[advanced_encryption_security_protocols][populate][image]=*&populate[commitment_continuous_improvement][populate][image]=*&populate[user_responsibility_best_practices][populate][image]=*&populate[highlight_box][populate][buttons]=*"
    );
    // if (!data || !data.attributes) {
    //   throw new Error("No data found");
    // }

    // strapi 5
    if (!data) {
      throw new Error("No data found");
    }
    armswapSecurityData = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3 className="text-[22px]">No data found</h3>
      </div>
    );
  }
  if (!armswapSecurityData===null) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const SecureMultiPartyComputation =
    armswapSecurityData.secure_multi_party_computation;
  const HowSmpcWorks = armswapSecurityData.how_smpc_works;
  const ArmswapRouter = armswapSecurityData.the_armswap_router;
  const DecentralizedNetwork =
    armswapSecurityData.decentralized_network_trustless_transactions;
  const AdvancedEncryption =
    armswapSecurityData.advanced_encryption_security_protocols;
  const CommitmentContinuousImprovement =
    armswapSecurityData.commitment_continuous_improvement;
  const UserResponsibility =
    armswapSecurityData.user_responsibility_best_practices;
  const BlueCardData = armswapSecurityData.highlight_box;

  return (
    <>
      {armswapSecurityData?.banner && (
        <div className="wrapped-gradient-banner">
          <Banner
            title={armswapSecurityData.banner.title}
            description={armswapSecurityData.banner.description}
            ImgURL={imgPath(armswapSecurityData.banner.image.url)}
            bannerButtons={[]}
            unoptomize={false}
            height={500}
            width={500}
          />
        </div>
      )}

      {SecureMultiPartyComputation && (
        <div className="wrapped-gradient-banner py-[40px]">
          <LeftColImage
            borderButtons={SecureMultiPartyComputation.border_buttons}
            primaryButtons={SecureMultiPartyComputation.primary_buttons}
            imgUrl={imgPath(SecureMultiPartyComputation.image.url)}
            title={SecureMultiPartyComputation.heading}
            description={SecureMultiPartyComputation.description}
          />
        </div>
      )}

      {HowSmpcWorks && (
        <div className="py-[40px] background-image-content">
          <HeadingDescriptionCard
            title={HowSmpcWorks.title}
            description={HowSmpcWorks.description}
            xl={3}
            md={6}
            lg={3}
            sm={12}
            xs={12}
            cardsData={HowSmpcWorks.cards}
            height={80}
            width={80}
            boderWidth={0}
            align="start"
            cardsBackground={"#FFF"}
            headingColor="#000000"
            cardTitleClr={"#101828"}
            cardParagraphClr={"#101828"}
          />
        </div>
      )}
      {ArmswapRouter && (
        <div className="blue-tick-bullets py-[40px] wrapped-gradient">
          <LeftColImage
            borderButtons={ArmswapRouter.border_buttons}
            primaryButtons={ArmswapRouter.primary_buttons}
            imgUrl={imgPath(ArmswapRouter.image.url)}
            title={ArmswapRouter.heading}
            description={ArmswapRouter.description}
          />
        </div>
      )}
      {DecentralizedNetwork && (
        <div className="blue-tick-bullets  background-image-content py-[40px] wrapped-gradient">
          <RightColImage
            borderButtons={DecentralizedNetwork.border_buttons}
            primaryButtons={DecentralizedNetwork.primary_buttons}
            imgUrl={imgPath(DecentralizedNetwork.image.url)}
            title={DecentralizedNetwork.heading}
            description={DecentralizedNetwork.description}
          />
        </div>
      )}

      {/* {AdvancedEncryption && (
        <div className="blue-tick-bullets py-[40px] wrapped-gradient">
          <LeftColImage
            borderButtons={AdvancedEncryption.border_buttons}
            primaryButtons={AdvancedEncryption.primary_buttons}
            imgUrl={imgPath(AdvancedEncryption.image.url)}
            title={AdvancedEncryption.heading}
            description={AdvancedEncryption.description}
          />
        </div>
      )} */}
      {CommitmentContinuousImprovement && (
        <div className="blue-tick-bullets   py-[40px] wrapped-gradient">
          <LeftColImage
            borderButtons={CommitmentContinuousImprovement.border_buttons}
            primaryButtons={CommitmentContinuousImprovement.primary_buttons}
            imgUrl={imgPath(CommitmentContinuousImprovement.image.url)}
            title={CommitmentContinuousImprovement.heading}
            description={CommitmentContinuousImprovement.description}
          />
        </div>
      )}

      {UserResponsibility && (
        <div className="blue-tick-bullets background-image-content py-[40px] wrapped-gradient">
          <RightColImage
            borderButtons={UserResponsibility.border_buttons}
            primaryButtons={UserResponsibility.primary_buttons}
            imgUrl={imgPath(UserResponsibility.image.url)}
            title={UserResponsibility.heading}
            description={UserResponsibility.description}
          />
        </div>
      )}
      <BlueCard
        title={BlueCardData.heading}
        description={BlueCardData.description}
        bannerButtons={BlueCardData.buttons}
        target="_self"
      />
    </>
  );
}
