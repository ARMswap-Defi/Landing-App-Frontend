import { imgPath } from "@/app/components/blog-card/blogCard";
import HeadingDescriptionCard from "@/app/components/heading-description-card/heading-description-card";
import Banner from "@/app/components/pageBanner/banner";
import Link from "next/link";
import { Container,Spinner, } from "react-bootstrap";
import { fetchData } from "../_utils/ServerApis";
import { Metadata } from "next";
import TabComponent from "../components/tab-component/TabComponent";

interface BannerData {
  id: number;
  title: string;
  description: string;
  image: any;
  buttons: any[];
}

export async function generateMetadata(): Promise<Metadata> {
  const MetaData: any = await fetchData("bridge?populate[meta_tag]=*");

  const Metatag: any = MetaData?.meta_tag || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function Bridge() {

  let BridgeData: any = null;
  try {

    const data: any = await fetchData(
      "bridge?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[tabs]=*&populate[how_it_works][populate][cards][populate][image]=*&populate[meta_tag]=*"
    );
    if (!data) {
      throw new Error("No data found");
    }
    BridgeData = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3 className="text-[22px]">No data found</h3>
      </div>
    );
  }
  if (!BridgeData) {
  
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const bannerData: BannerData = BridgeData.banner;
  const tabsData = BridgeData.tabs;
  const howItWorks = BridgeData.how_it_works;
  return (
    <>
      {bannerData ? (
        <div className="wrapped-gradient-banner">
          <Banner
            title={bannerData.title}
            description={bannerData.description}
            ImgURL={imgPath(bannerData.image.url)}
            bannerButtons={bannerData.buttons}
            unoptomize={false}
            height={578}
            width={752}
          />
        </div>
      ) : null}
      {tabsData?.length > 0 && (
        <section className="py-[40px]">
          <Container>
            <h2 className="font-semibold text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] text-center text-[#000000]">
              Why Choose ARMswap?
            </h2>

            <br />
            <TabComponent tabsData={tabsData} />
          </Container>
        </section>
      )}

      {howItWorks ? (
        <section className=" py-[40px]">
          <HeadingDescriptionCard
            title={howItWorks.title}
            description={howItWorks.description}
            xl={4}
            md={6}
            lg={4}
            sm={12}
            xs={12}
            cardsData={howItWorks.cards}
            height={56}
            width={56}
            boderWidth={1}
            align="start"
            cardsBackground={"#EFF6FD"}
            headingColor="#000000"
            cardTitleClr={"#101828"}
            cardParagraphClr={"#101828"}
          />
        </section>
      ) : null}
      <section className="py-[40px]">
        <Container>
          <br />
          <div className="bg-[#EAF4FF] md:rounded-[100px] md:py-[40px] max-[768px]:p-[20px] gap-[24px] max-[768px]:p-[20px] max-[768px]:pb-[30px]">
            <div className="md:w-[70%] m-auto text-center">
              <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] text-[#298DFE] font-bold text-center py-[10px] ">
                Start Bridging Your Tokens Today!
              </h2>
              <p className="text-[20px] max-[768px]:text-[16px] text-[#000000] py-[10px]">
                Ready to bridge your tokens with ease? Get started with ARMswap
                now and experience seamless cross-chain trading. Your journey
                into the world of hassle-free token bridging begins here.
              </p>
            </div>
            <br />
            <div className="text-center">
              <Link
                className="py-[12px] px-[24px] bg-[#298DFE] text-white font-bold m-auto rounded-[1000px]"
                href={"https://app.armswap.com/#/bridge"}
              >
                Get Started
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
