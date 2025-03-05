
import { imgPath } from "@/app/components/blog-card/blogCard";
import LeftColImage from "@/app/components/left-col-image/left-col-image";
import Banner from "@/app/components/pageBanner/banner";
import RightColImage from "../components/right-col-image/right-col-iamge";
import { Container, Spinner } from "react-bootstrap";
import HeadingDescriptionCard from "../components/heading-description-card/heading-description-card";
import Link from "next/link";
import { fetchData } from "../_utils/ServerApis";
import { BannerData, ColImageSectionData } from "../types/types";
import { Metadata } from "next";
import CoinSlider from "../components/CoinSlider/coin-slider";

import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

// export async function generateMetadata(): Promise<Metadata> {
//   const MetaData: any = await fetchData("pool?populate[meta_tags]=*");

//   const Metatag: any = MetaData?.meta_tags || {};

//   return {
//     title: Metatag.title || "Default Title",
//     description: Metatag.description || "Default description",
//     // Add other metadata fields as needed
//   };
// }
export async function generateMetadata(): Promise<Metadata> {
  const MetaData: any = await fetchData(
    "/pool?populate[meta_tags]=*"
  );

  const Metatag: any = MetaData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function Pool() {
  // const [poolsData, setPoolsData] = useState<any>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   async function fetchPoolsData() {
  //     setLoading(true);
  //     try {
  //       // strapi 4 data fetching
  //       // const data: any = await fetchData(
  //       //   "/home?populate=*,earn_oppertunity.border_buttons,earn_oppertunity.image,banner,banner.buttons,our_affiliated_projects.roadmap_cards.image,roadmap.roadmap_cards.image,armswap_empowering.image,armswap_empowering.border_buttons,trade_nytime.border_buttons,trade_nytime.image,how_it_works.cards.image,multi_chain_bridge.cards.image,join_our_community.cards.link_buttons,cross_chain_content.image,cross_chain_content.border_buttons,cross_chain_content.primary_buttons,multi_party_content.image,multi_party_content.border_buttons,multi_party_content.primary_buttons,faqs,armsp_token_roadmaps,coin_heading_description,coins.coin_image,meta_tags"
  //       // );

  //       //strapi 5 data fetching
  //       const data: any = await fetchData(
  //         "/pool?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[coin_heading_description]=*&populate[section_one][populate][image]=*&populate[section_two][populate][image]=*&populate[coins][populate][coin_image]=*&populate[how_to_add_liquidity][populate][cards][populate][image]=*&populate[how_to_add_liquidity][populate][cards][populate][link_buttons]=*&populate[meta_tags]=*"
  //       );

  //       // if (!data || !data?.attributes) {
  //       //   throw new Error("No data found");
  //       // }
  //       if (!data) {
  //         throw new Error("No data found");
  //       } else {
  //         setPoolsData(data);
  //         setLoading(false);
  //       }
  //     } catch (error: any) {
  //       console.error("Error fetching data:", error?.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchPoolsData();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="text-center py-5">
  //       <Spinner animation="border" variant="primary" role="status">
  //         <span className="sr-only">Loading...</span>
  //       </Spinner>
  //     </div>
  //   );
  // }

  // if (!poolsData) {
  //   return (
  //     <div className="text-center py-5">
  //       <h3>No data found</h3>
  //     </div>
  //   );
  // }
  let poolsData:any=null

  try {
    // strapi 4
    // const data: any = await fetchData(
    //   "armswap-security?populate=*,banner.image,secure_multi_party_computation.image,how_smpc_works.cards.image,the_armswap_router.image,decentralized_network_trustless_transactions.image,advanced_encryption_security_protocols.image,commitment_continuous_improvement.image,user_responsibility_best_practices.image,highlight_box.buttons"
    // );

    // Strapi 5
    const data: any = await fetchData(
      "/pool?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[coin_heading_description]=*&populate[section_one][populate][image]=*&populate[section_two][populate][image]=*&populate[coins][populate][coin_image]=*&populate[how_to_add_liquidity][populate][cards][populate][image]=*&populate[how_to_add_liquidity][populate][cards][populate][link_buttons]=*&populate[meta_tags]=*"
    );
    // if (!data || !data.attributes) {
    //   throw new Error("No data found");
    // }

    // strapi 5
    if (!data) {
      throw new Error("No data found");
    }
    poolsData = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3 className="text-[22px]">No data found</h3>
      </div>
    );
  }
  if (!poolsData===null) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const bannerData: BannerData = poolsData?.banner;
  const coinList = poolsData?.coin_heading_description;
  const coins = poolsData?.coins;
  const sectionOne: ColImageSectionData = poolsData?.section_one;
  const sectionTwo: ColImageSectionData = poolsData?.section_two;
  const cardsData = poolsData?.how_to_add_liquidity;
  const cardsNotice = poolsData?.card_section_notice;

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
      <section className="coin-slider py-[40px] text-center">
        <Container>
          {coinList && (
            <>
              <h2 className="text-[40px] max-[600px]:text-[30px] leading-[40px] text-[#1E344E] font-bold ">
                {coinList?.heading}
              </h2>
              <br />
              <div className=" mx-auto ">
                <p className=" text-[#475565]text-[16px] max-[768px]:text-[16px] leading-[30px] text-center pt-[20px] pb-[44px]">
                  {coinList?.description}
                </p>
              </div>
            </>
          )}
          {coins && <CoinSlider coins={coins} />}
          <div className="mx-auto ">
            <p className="text-[16px] max-[768px]:text-[16px] text-[#475565] py-[44px]">
              Initially, we offer custom pool creation for 20 blockchains, with
              plans to expand to over 100 by mid-2025
            </p>
          </div>
          <Link
            className="primary-btn-link bg-[#298DFE]  border border-[#298DFE] text-[#ffffff] px-[12px] py-[12px] max-[768px]:p-[10px] text-base font-bold rounded-lg mr-1"
            href="https://app.armswap.com/#/pool"
            target="_blank"
          >
            Create Pool
          </Link>
        </Container>
      </section>

      {sectionOne && (
        <section className="py-[40px]">
          <LeftColImage
            primaryButtons={[]}
            borderButtons={[]}
            imgUrl={imgPath(sectionOne?.image?.url)}
            title={sectionOne?.heading}
            description={sectionOne?.description}
          />
        </section>
      )}
      {cardsData ? (
        <section className="py-[80px] max-[768px]:py-[40px] bg-[#FCFCFD] ">
          <>
            <HeadingDescriptionCard
              title={cardsData?.title}
              description={cardsData?.description}
              xl={3}
              md={6}
              lg={3}
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
            <br />
            <>
               <Container>
               <ReactMarkdown
                  className="text-[20px] max-[768px]:text-[18px] leading-[27px] markdown-description min-[992px]:w-[75%] min-[992px]:m-auto"
                  rehypePlugins={[rehypeRaw]}
                >
                  {cardsNotice}
                </ReactMarkdown>
               </Container>
            </>
          </>
        </section>
      ) : null}
      <section className="py-[40px]">

      {sectionTwo && (
        <RightColImage
          primaryButtons={sectionTwo?.primary_buttons}
          borderButtons={[]}
          imgUrl={imgPath(sectionTwo?.image?.url)}
          title={sectionTwo?.heading}
          description={sectionTwo?.description}
        />
      )}
      </section>
      <section className="py-[40px]">
        <Container>
          <br />
          <div className="bg-[#EAF4FF] md:rounded-[100px] md:py-[40px] max-[768px]:p-[20px] gap-[24px] max-[768px]:p-[20px] max-[768px]:pb-[30px]">
            <div className="md:w-[60%] m-auto text-center">
              <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] text-[#298DFE] font-bold text-center">
                Join ARMswap Today
              </h2>
              <br />
              <p className="text-[20px] max-[768px]:text-[18px] text-[#101828]">
                Join the evolution of decentralized finance with ARMswap today.
                Create pools, add liquidity, and get paid for contributing to a
                dynamic and interconnected blockchain world!
              </p>
            </div>
            <br />
            <div className="text-center">
              <Link
                className="py-[12px] px-[24px] bg-[#298DFE] text-white font-bold m-auto rounded-[1000px]"
                href={"https://app.armswap.com/#/pool"}
                target="_blank"
              >
                Join Now
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
