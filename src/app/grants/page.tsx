import { fetchData } from "@/app/_utils/ServerApis";
import { imgPath } from "@/app/components/blog-card/blogCard";
import FAQs from "@/app/components/faq/faq";
import HeadingDescriptionCard from "@/app/components/heading-description-card/heading-description-card";
import LeftColImage from "@/app/components/left-col-image/left-col-image";
import Banner from "@/app/components/pageBanner/banner";
import { FAQtype} from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Metadata } from "next";

// This function fetches metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const aboutData: any = await fetchData("grant?populate[meta_tags]=*");

  const Metatag: any = aboutData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function Grants() {
  // const GrantsToken: any = await fetchData(
  //   "grant?populate=*,banner.buttons,banner.image,faqs,How_can_you_get_involved.cards,armswap_grants.image"
  // );
  let GrantsToken: any = null;
  try {
    // const data: any = await fetchData(
    //   "grant?populate=*,banner.buttons,banner.image,faqs,How_can_you_get_involved.cards.image,armswap_grants.image"
    // );

    // strapi 5
    const data: any = await fetchData(
      "/grant?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[How_can_you_get_involved][populate][cards][populate][image]=*&populate[armswap_grants][populate][image]=*&populate[meta_tags]=*&populate[faqs]=*&populate[reporting_conduct_violations][populate][image]=*&populate[reporting_conduct_violations][populate][primary_buttons]=*"
    );
    if (!data) {
      throw new Error("No data found");
    }
    GrantsToken = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3 className="text-[22px]">No data found</h3>
      </div>
    );
  }
  if (!GrantsToken) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const FAQsData: FAQtype[] = GrantsToken?.faqs;
  const BannerData: any = GrantsToken?.banner;
  const grantData: any = GrantsToken?.armswap_grants;
  const reportingConductViolations:any = GrantsToken?.reporting_conduct_violations

  const howCanYouGetInvolved: any = GrantsToken?.How_can_you_get_involved;
  // console.log("banner", BannerData);
  return (
    <>
      {BannerData ? (
        <div className="wrapped-gradient-banner">
          <Banner
            title={BannerData.title}
            description={BannerData.description}
            ImgURL={imgPath(BannerData.image.url)}
            bannerButtons={BannerData.buttons}
            unoptomize={false}
            height={BannerData.image.height}
            width={BannerData.image.width}
          />
        </div>
      ) : null}

      {grantData && (
        <section className="py-[40px]">
          <LeftColImage
            borderButtons={[]}
            primaryButtons={[]}
            imgUrl={imgPath(grantData?.image.url)}
            title={grantData?.heading}
            description={grantData?.description}
          />
        </section>
      )}
      <section className="py-[40px] ">
        <Container>
          <Row>
            <Col md={6} className="max-[768px]:pb-[20px]">
              <Card className="h-full border boder-[#EAECF0]">
                <div className="p-[24px] max-[767px]:p-[10px] border-b border-b-[#EAECF0] text-[18px] max-[768px]:text-center text-[#298DFE]">
                  Associated Discord Channels:
                </div>
                <div className="p-[24px] max-[768px]:p-[10px] grants-buttons">
                  <Link
                    target="_blank"
                    href={
                      "https://discordapp.com/channels/1158627911276953621/1248728099256926338"
                    }
                  >
                    <Image
                      src="/images/grants/dev-work.svg"
                      alt="image"
                      height={48}
                      width={550}
                      className="w-full mb-2"
                    />
                  </Link>
                  <Link
                    target="_blank"
                    href={
                      "https://discordapp.com/channels/1158627911276953621/1248728166961250346"
                    }
                  >
                    <Image
                      src="/images/grants/mvp-support.svg"
                      alt="image"
                      height={48}
                      width={550}
                      className="w-full mb-2"
                    />
                  </Link>
                  <Link
                    target="_blank"
                    href={
                      "https://discordapp.com/channels/1158627911276953621/1248728432234463313"
                    }
                  >
                    <Image
                      src="/images/grants/QnA.svg"
                      alt="image"
                      height={48}
                      width={550}
                      className="w-full "
                    />
                  </Link>
                </div>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-full">
                <div className="p-[24px] max-[767px]:p-[10px] border-b border-b-[#EAECF0] max-[767px]:text-center text-[18px] text-[#298DFE]">
                  Associated Submission Forms:
                </div>
                <div className="p-[24px] max-[768px]:p-[10px] grants-buttons">
                  <Link
                    target="_blank"
                    href={"https://token.armswap.com/user/contribution/bounty"}
                  >
                    <Image
                      src="/images/grants/QEform.svg"
                      alt="image"
                      height={48}
                      width={550}
                      className="w-full mb-2"
                    />
                  </Link>
                  <Link
                    target="_blank"
                    href={"https://token.armswap.com/user/contribution/growth"}
                  >
                    <Image
                      src="/images/grants/submission.svg"
                      alt="image"
                      height={48}
                      width={550}
                      className="w-full "
                    />
                  </Link>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      {howCanYouGetInvolved ? (
        <section className="py-[40px] bg-[#EFF6FD]">
          <HeadingDescriptionCard
            title={howCanYouGetInvolved.title}
            description={howCanYouGetInvolved.description}
            xl={4}
            md={6}
            lg={4}
            sm={12}
            xs={12}
            cardsData={howCanYouGetInvolved.cards}
            height={56}
            width={56}
            boderWidth={1}
            align="start"
            cardsBackground={"#fff"}
            headingColor="#000000"
            cardTitleClr={"#101828"}
            cardParagraphClr={"#101828"}
          />
        </section>
      ) : null}
   
      
      {reportingConductViolations && (
        <section className="pb-[40px] pt-[80px]">
          <LeftColImage
            borderButtons={reportingConductViolations?.primary_buttons}
            primaryButtons={[]}
            imgUrl={imgPath(reportingConductViolations?.image.url)}
            title={reportingConductViolations?.heading}
            description={reportingConductViolations?.description}
          />
        </section>
      )}
         <section className="py-[40px]">
        <Container>
          <br />
          <div className="bg-[#EAF4FF] md:rounded-[100px] md:px-[80px] md:py-[40px] max-[768px]:p-[20px] max-[768px]:pb-[30px]">
            <div className="md:w-[70%] m-auto text-center">
              <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] text-[#298DFE] font-bold text-center pb-[10px]">
                  Reporting Conduct Violations
              </h2>
              <br className="hidden md:block" />
              <p className="text-[16px] max-[768px]:text-[16px] text-[#101828] py-[10px]">
                If you experience or witness any behavior such as harassment or have any other concerns
                 that violate our community standards, whether online or offline, please report it promptly
                  by using the provided link or by contacting a member of our MVP program team.
                  
              </p>
            </div>
            <br />
            <div className="text-center">
              <Link
                className="primary-btn-link py-[12px] px-[24px] bg-[#298DFE] text-white font-bold m-auto rounded-[1000px]"
                href={"https://help.armswap.com/"}
              >
                Report Now
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <Container className="pt-[40px]">
        <FAQs questions={FAQsData} />
      </Container>
    </>
  );
}
