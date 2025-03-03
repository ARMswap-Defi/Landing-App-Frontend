import { imgPath } from "@/app/components/blog-card/blogCard";
import FAQs from "@/app/components/faq/faq";
import HeadingDescriptionCard from "@/app/components/heading-description-card/heading-description-card";
import LeftColImage from "@/app/components/left-col-image/left-col-image";
import Banner from "@/app/components/pageBanner/banner";
import { FAQtype } from "@/app/types/types";
import { Metadata } from "next";
import {
  Container,
  Spinner,
} from "react-bootstrap";
import { fetchData } from "../_utils/ServerApis";
import TabComponent from "../components/tab-component/TabComponent";

interface BannerData {
  id: number;
  title: string;
  description: string;
  image: any;
}
interface TabData {
  id: string;
  heading: string;
  description: string;
}
export async function generateMetadata(): Promise<Metadata> {
  const aboutData: any = await fetchData("governance?populate[meta_tags]=*");

  const Metatag: any = aboutData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function Governance() {
  let GovernanceData: any = null;
  try {
    const data: any = await fetchData(
      "/governance?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[the_armswap_coin][populate][image]=*&populate[tabs]=*&populate[the_governance_apps][populate][cards][populate][link_buttons]=*&populate[the_governance_apps][populate][cards][populate][image]=*&populate[meta_tags]=*"
    );
    if (!data) {
      throw new Error("No data found");
    }
    GovernanceData = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3 className="text-[22px]">No data found</h3>
      </div>
    );
  }
  if (!GovernanceData) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const bannerData: BannerData = GovernanceData.banner;
  const theArmswapCoinData = GovernanceData.the_armswap_coin;
  const cardsData = GovernanceData.the_governance_apps;
  const tabsData: TabData[] = GovernanceData.tabs;
  const FAQsData: FAQtype[] = GovernanceData.faqs;

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
            height={bannerData.image.height}
            width={bannerData.image.width}
          />
        </div>
      ) : null}
      <br className="hidden max-[768px]:block" />
      <br className="hidden max-[768px]:block"/>
      {theArmswapCoinData ? (
        <LeftColImage
          primaryButtons={[]}
          borderButtons={[]}
          imgUrl={imgPath(theArmswapCoinData?.image?.url)}
          title={theArmswapCoinData?.heading}
          description={theArmswapCoinData?.description}
        />
      ) : null}
      {cardsData && (
        <section className="py-[40px] max-[768px]:py-[40px] bg-[#FCFCFD]">
          <HeadingDescriptionCard
            title={cardsData?.title}
            description={cardsData?.description}
            xl={4}
            md={6}
            lg={4}
            sm={12}
            xs={12}
            cardsData={cardsData?.cards}
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
      {tabsData?.length > 0 && (
        <section className="py-[40px] max-[768px]:py-[40px] bg-[#FCFCFD]">
          <Container>
            <h2 className="font-semibold text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] text-[40px] text-center text-[#000000]">
              4 Roles of ARMswap Governance
            </h2>
            <p className="text-[20px] text-center py-[10px] ">
            Within ARMswap, there are four primary roles that determine the activities and obligations of the role-takers. {" "}
            </p>

            <br />
            <TabComponent tabsData={tabsData} />
          </Container>
        </section>
      )}
      {FAQsData && (
        <Container>
          <FAQs questions={FAQsData} />
        </Container>
      )}
    </>
  );
}
