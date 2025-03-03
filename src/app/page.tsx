import Image from "next/image";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Link from "next/link";
import LeftColImage from "./components/left-col-image/left-col-image";
import RightColImage from "./components/right-col-image/right-col-iamge";
import FAQ from "./components/faq/faq";
import BlogCard, { imgPath } from "./components/blog-card/blogCard";
import FeatureBanner from "./components/feature-banner/featureBanner";
import { ColImageSectionData, FAQtype } from "./types/types";
import { fetchData } from "./_utils/ServerApis";
import HeadingDescriptionCard from "./components/heading-description-card/heading-description-card";
import RoadmapSection from "./components/roadmap/roadmap";
import RoadmapSectionMobile from "./components/roadmap-mobile/roadmap-mobile";
// import CoinSlider from "./components/CoinSlider/coin-slider";
// import IconSlider from "./components/IconSlider/icon-slider";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import dynamic from "next/dynamic";
import { Metadata } from "next";

const IconSlider = dynamic(
  () => import("./components/IconSlider/icon-slider"),
  { ssr: false }
);
const CoinSlider = dynamic(
  () => import("./components/CoinSlider/coin-slider"),
  { ssr: false }
);

export async function generateMetadata(): Promise<Metadata> {
  const MetaData: any = await fetchData("home?populate[meta_tags]=*");

  const Metatag: any = MetaData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function Home() {
  let homeData: any = null;
  let TeamMembers: any = null;
  let blogsData: any = null;

  try {
    const home_data: any = await fetchData(
      "/home?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[earn_oppertunity][populate][border_buttons]=*&populate[earn_oppertunity][populate][image]=*&populate[our_affiliated_projects][populate][roadmap_cards][populate][image]=*&populate[roadmap][populate][roadmap_cards][populate][image]=*&populate[armswap_empowering][populate][image]=*&populate[armswap_empowering][populate][border_buttons]=*&populate[trade_nytime][populate][border_buttons]=*&populate[trade_nytime][populate][image]=*&populate[how_it_works][populate][cards][populate][image]=*&populate[multi_chain_bridge][populate][cards][populate][image]=*&populate[join_our_community][populate][cards][populate][link_buttons]=*&populate[cross_chain_content][populate][image]=*&populate[cross_chain_content][populate][border_buttons]=*&populate[cross_chain_content][populate][primary_buttons]=*&populate[multi_party_content][populate][image]=*&populate[multi_party_content][populate][border_buttons]=*&populate[multi_party_content][populate][primary_buttons]=*&populate[faqs]=*&populate[armsp_token_roadmaps]=*&populate[coin_heading_description]=*&populate[coins][populate][coin_image]=*"
    );
    if (!home_data) {
      throw new Error("No data found");
    }
    homeData = home_data;

    const dataTeam: any = await fetchData(
      "/meet-the-teams?populate=*&pagination[limit]=10&sort=order:asc"
    );
    if (!dataTeam) {
      throw new Error("No data found");
    }
    TeamMembers = dataTeam;

    const dataBlog: any = await fetchData(
      "/blogs?populate=*&pagination[limit]=3&sort[0]=publishedAt:desc"
    );
    if (!dataBlog) {
      throw new Error("No data found");
    }

    blogsData = dataBlog;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3>No data found</h3>
      </div>
    );
  }
  if (!homeData) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const FAQsData: FAQtype[] = homeData?.faqs;
  const EarnOppertunity: ColImageSectionData = homeData?.earn_oppertunity;
  const howItWorks: any = homeData?.how_it_works;
  const multiChainBridges: any = homeData?.multi_chain_bridge;
  const joinOurCommunity: any = homeData?.join_our_community;
  const crossChainContent: ColImageSectionData = homeData?.cross_chain_content;
  const multiPartyContent: ColImageSectionData = homeData?.multi_party_content;
  const armspTokenContent: any = homeData?.armsp_token_roadmaps;
  const CoinList: any = homeData?.coin_heading_description;
  const Coins: any = homeData?.coins;
  const TradeAnyTime: ColImageSectionData = homeData?.trade_nytime;
  const ArmswapEmpowering: ColImageSectionData = homeData?.armswap_empowering;
  const Roadmap: any = homeData?.roadmap;
  const homeBanner: any = homeData?.banner;
  // const metatag: any = homeData?.meta_tags;

  const OurAffiliatedProjects: any = homeData?.our_affiliated_projects;
  //
  // console.log('coin list', CoinList)
  // console.log('coins', Coins)
  if (!homeData) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      {/* <Helmet>
        <title>{metatag?.title}</title>
        <meta name="description" content={metatag?.description} />
      </Helmet> */}
      {homeData !== null ? (
        <>
          <div className="home-banner-video">
            <Container>
              <Row>
                <Col md={6} className="banner-text-col">
                  <div className="content max-[767px]:text-center">
                    <h1 className="lg:text-[64px]  sm:text-[30px] text-[30px] max-[1280px]:pt-[20px] max-[767px]:pt-[35px] font-bold mb-2">
                      {homeBanner.title}
                    </h1>
                    <p className="text-[20px] max-[767px]:text-[18px] text-[#000000] mb-4 font-medium leading-[32px]">
                      {homeBanner.description}
                    </p>
                    <div className="flex gap-4 pb-[15px] max-[767px]:items-center max-[767px]:justify-center">
                      <>
                        {homeBanner.buttons.map(
                          (button: any, index: number) => {
                            return (
                              <Link
                                key={index}
                                className="primary-btn-link bg-[#298DFE] text-white py-[12px] px-[12px] max-[767px]:p-[10px] font-bold rounded-lg"
                                href={button.link}
                              >
                                {button.title}
                              </Link>
                            );
                          }
                        )}
                      </>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="banner-img-col">
                  <div className="video-container p-[20px]">
                    <video
                      className="w-full h-auto"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/videos/home-banner.mp4" // Optional placeholder image before video loads
                    >
                      <source src="/videos/home-banner.mp4" type="video/mp4" />
                    </video>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          {/* </AnimatedWrapper> */}
          {armspTokenContent && (
            <FeatureBanner roadmapData={armspTokenContent} />
          )}
          {CoinList ? (
            <section className="coin-slider py-[40px] text-center">
              <Container>
                <h2 className="text-[40px] ...">{CoinList.heading}</h2>
                <br />
                <p className="text-[20px] ...">{CoinList.description}</p>
                <br />
                {Coins && <CoinSlider coins={Coins} />}
              </Container>
            </section>
          ) : (
            <p>No data available</p>
          )}
          {TradeAnyTime && (
            <div className="py-[40px]  ">
              <RightColImage
                borderButtons={TradeAnyTime.border_buttons}
                primaryButtons={TradeAnyTime.primary_buttons}
                imgUrl={imgPath(TradeAnyTime.image.url)}
                title={TradeAnyTime.heading}
                description={TradeAnyTime.description}
              />
            </div>
          )}

          {ArmswapEmpowering && (
            <div className="py-[40px] background-image-content">
              <LeftColImage
                borderButtons={crossChainContent.border_buttons}
                primaryButtons={crossChainContent.primary_buttons}
                imgUrl={imgPath(crossChainContent.image.url)}
                title={crossChainContent.heading}
                description={crossChainContent.description}
              />
            </div>
          )}
          {crossChainContent && (
            <div className="py-[40px] ">
              <Container>
                {/* <AnimatedWrapper from="right" delay={0.3}> */}
                <Row className="col-image-row">
                  <Col md={6} className="flex items-center ">
                    <div className="md:w-[90%]">
                      <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px]  max-[992px]:leading-[40px] max-[768px]:leading-[35px]  max-[767px]:text-center font-bold  mb-[24px]">
                        {ArmswapEmpowering.heading}
                      </h2>
                      {/* <p className="text-[18px] leading-[27px] mb-[24px]">
                {description}
              </p>  */}
                      <ReactMarkdown
                        className="text-[20px] max-[768px]:text-[18px] leading-[27px] markdown-description mb-[24px] "
                        rehypePlugins={[rehypeRaw]}
                      >
                        {ArmswapEmpowering.description}
                      </ReactMarkdown>

                      {ArmswapEmpowering.border_buttons?.length > 0 && (
                        <div className="flex  max-[767px]:items-center max-[767px]:justify-evenly max-[767px]:mb-[15px]">
                          {ArmswapEmpowering.border_buttons?.map(
                            (button: any, index: number) => {
                              return (
                                <Link
                                  key={button?.id}
                                  className="border-btn-link bg-transparent hollow-button border border-[#298DFE] text-[#298DFE] px-[24px] py-[12px] max-[768px]:p-[10px] text-base font-bold rounded-lg  mr-1"
                                  href={button.link}
                                >
                                  {button.title}
                                </Link>
                              );
                            }
                          )}
                        </div>
                      )}
                      {ArmswapEmpowering.primary_buttons?.length !== 0 && (
                        <div className="flex  max-[767px]:items-center max-[767px]:justify-evenly max-[767px]:mb-[15px]">
                          {ArmswapEmpowering.primary_buttons?.map(
                            (button: any, index: number) => {
                              return (
                                <Link
                                  key={button?.id}
                                  className="primary-btn-link bg-[#298DFE]  border border-[#298DFE] text-[#ffffff] px-[24px] py-[12px] max-[768px]:p-[10px] text-base font-bold rounded-lg mr-1"
                                  href={button.link}
                                >
                                  {button.title}
                                </Link>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  </Col>

                  <Col
                    md={6}
                    className=" flex justify-center gradient-img my-auto lg:pl-[5rem] "
                  >
                    <div className="video-container p-[20px]">
                      <video
                        className="w-full h-auto"
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/videos/Mobile_app.mp4" // Optional placeholder image before video loads
                      >
                        <source src="/videos/Mobile_app.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </Col>
                </Row>
                {/* </AnimatedWrapper> */}
              </Container>
            </div>
          )}
          <br className="hidden max-[768px]:block" />
          {multiPartyContent && (
            <div className="py-[40px]  background-image-content ">
              <LeftColImage
                borderButtons={multiPartyContent?.border_buttons}
                primaryButtons={multiPartyContent?.primary_buttons}
                imgUrl={imgPath(multiPartyContent?.image.url)}
                title={multiPartyContent?.heading}
                description={multiPartyContent?.description}
              />
            </div>
          )}
          {EarnOppertunity && (
            <div className="py-[40px]  hand-img wrapped-gradient ">
              <RightColImage
                borderButtons={EarnOppertunity.border_buttons}
                primaryButtons={EarnOppertunity.primary_buttons}
                imgUrl={imgPath(EarnOppertunity.image.url)}
                title={EarnOppertunity.heading}
                description={EarnOppertunity.description}
              />
            </div>
          )}
          {howItWorks ? (
            <section>
              <div className="py-[40px] ">
                <HeadingDescriptionCard
                  title={howItWorks.title}
                  description={howItWorks.description}
                  xl={4}
                  md={4}
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
              </div>
            </section>
          ) : null}
          {multiChainBridges && (
            <section className="py-[40px] description-icon-section background-image-content">
              <HeadingDescriptionCard
                title={multiChainBridges.title}
                description={multiChainBridges.description}
                xl={4}
                md={6}
                lg={4}
                sm={12}
                xs={12}
                cardsData={multiChainBridges.cards}
                height={72}
                width={72}
                boderWidth={0}
                align="left"
                cardsBackground={"transparent"}
                headingColor="#000000"
                cardTitleClr={"#101828"}
                cardParagraphClr={"#101828"}
              />
            </section>
          )}
          {joinOurCommunity && (
            <section className=" py-[40px] ">
              <HeadingDescriptionCard
                title={joinOurCommunity.title}
                description={joinOurCommunity.description}
                xl={4}
                md={6}
                lg={4}
                sm={12}
                xs={12}
                cardsData={joinOurCommunity.cards}
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
          )}
          {Roadmap && (
            <section>
              <div className="py-[40px] background-image-content flex flex-col items-center justify-center ">
                <section className="laptop">
                  <RoadmapSection
                    title={Roadmap?.heading}
                    description={Roadmap?.description}
                    roadmapCards={Roadmap?.roadmap_cards}
                    col={3}
                  />
                </section>
                <section className="mobile">
                  <RoadmapSectionMobile
                    title={Roadmap?.heading}
                    description={Roadmap?.description}
                    roadmapCards={Roadmap?.roadmap_cards}
                    col={3}
                  />
                </section>
                <Link
                  className="primary-btn-link w-fit bg-[#298DFE] text-white px-[24px] py-[12px] text-base text-center font-bold rounded-lg w-[140px] px-[24px] py-[12px]"
                  href="/roadmap"
                >
                  Learn more
                  <span className="arrow-content ml-2 inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </section>
          )}

          {TeamMembers && (
            <section className="py-[40px] ">
              <Container>
                <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px]  font-bold  text-[#000000] text-center">
                  Meet the Team Behind ARMswap
                </h2>
                <br />
                <p className="text-[20px] max-[768px]:text-[18px] leading-[27px] text-[#000000] text-center">
                  We are proud to be a awesome team. We are really awesome
                  people with good knowledge.
                </p>

                <br />
                <div className="flex flex-wrap justify-center">
                  {TeamMembers?.map((member: any, index: number) => {
                    return (
                      <Link
                        className="xl:w-[20%] lg:w-[25%] md:w-[33%] sm:w-[50%] xs-[50%] p-[10px] team-link"
                        key={index + member?.id + member?.name}
                        href={member?.url !== null ? member?.url : ""}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="team-member-image mb-[10px]">
                          <Image
                            src={imgPath(member?.image?.url)}
                            className="w-full"
                            alt={member?.name}
                            width={230}
                            height={230}
                          />
                        </div>
                        <h4 className="text-[20px] max-[475px]:text-[18px] leading-[30px] font-semibold w-[230px] max-[475px]:w-[150px] max-[600px]:text-center">
                          {member?.name}
                        </h4>
                        <p className="text-[20px] max-[768px]:text-[18px] w-[230px] max-[475px]:w-[150px] max-[475px]:text-[16px] max-[600px]:text-center">
                          {member?.designation}
                        </p>
                      </Link>
                    );
                  })}
                </div>
                <div className="text-center pt-[40px]">
                  <Link
                    className="primary-btn-link py-[12px] px-[24px] bg-[#298DFE] text-white font-bold m-auto rounded-[8px]"
                    href={"/meet-the-team"}
                  >
                    View All
                  </Link>
                </div>
              </Container>
            </section>
          )}
          {blogsData && (
            <section>
              <div className="py-[40px]">
                <Container>
                  <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px]  max-[992px]:leading-[40px] max-[768px]:leading-[35px] text-[#000000] text-center font-bold py-[20px]">
                    Our Featured Articles
                  </h2>
                  <Row>
                    {blogsData?.map((blog: any, index: number) => {
                      return (
                        <Col md={6} lg={4} key={blog.id} className="pb-4">
                          <BlogCard blog={blog} />
                        </Col>
                      );
                    })}
                  </Row>
                </Container>
              </div>
            </section>
          )}

          {OurAffiliatedProjects && (
            <section className="py-[40px]">
              <Container>
                <div
                  className="bg-light-grey text-center py-[40px]"
                  style={{ paddingBottom: "40px" }}
                >
                  <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] font-semibold text-[#000000] text-center ">
                    {OurAffiliatedProjects?.heading}
                  </h2>

                  <IconSlider icons={OurAffiliatedProjects?.roadmap_cards} />

                  <Link
                    className="primary-btn-link w-fit bg-[#298DFE] text-white px-[24px] py-[12px] text-base text-center font-bold rounded-lg w-[140px] px-[24px] py-[12px]"
                    href="/armswap-affiliated-projects"
                  >
                    Learn more
                    <span className="arrow-content ml-2 inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </Container>
            </section>
          )}
          <Container className="py-[40px]">
            <FAQ questions={FAQsData} />
          </Container>
        </>
      ) : (
        <>
          {" "}
          {/* <div className="text-center py-5">
            <Spinner animation="border" variant="primary" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div> */}
        </>
      )}
    </>
  );
}
