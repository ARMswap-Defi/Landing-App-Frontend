import { fetchData } from "@/app/_utils/ServerApis";
import { imgPath } from "@/app/components/blog-card/blogCard";
import LeftColImage from "@/app/components/left-col-image/left-col-image";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Image from "next/image";

import RightColImage from "@/app/components/right-col-image/right-col-iamge";
import styles from "../components/pageBanner/banner.module.scss";
import RegisterYourIntrest from "../components/register-your-intrest/register-your-intrest";
export async function generateMetadata({ params, searchParams }: any) {
  return {
    title: "Mobile App",
    description: "This is the description for my page",
  };
}
export default async function ArmSwapMobileApp() {
  let mobileAppData: any = null;
  try {
    const data: any = await fetchData(
      "/arm-swap-mobile-app?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[swap_your_assets_smoothly][populate][image]=*&populate[bridge_your_assets_effortlessly][populate][image]=*"
    );
    if (!data) {
      throw new Error("No data found");
    }
    mobileAppData = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3 className="text-[22px]">No data found</h3>
      </div>
    );
  }
  if (!mobileAppData) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const SwapAssets: any = mobileAppData.swap_your_assets_smoothly;
  // console.log("swap", SwapAssets);
  const BridgeAssests: any = mobileAppData.bridge_your_assets_effortlessly;
  return (
    <>
      {mobileAppData.banner && (
        <div className="wrapped-gradient-banner mobile-app-banner">
          <div className={`${styles.banner}`}>
            <Row>
              <Col md={6} className={styles["banner-text-col"]}>
                <Container className={`${styles["content"]} max-[767px]:text-center`}>
                  <h1 className="text-[#101828] lg:text-[64px]  sm:text-[30px] max-[768px]:pt-[35px] max-[1280px]:pt-[20px] text-[30px] font-bold mb-2">
                    {mobileAppData.banner.title}
                  </h1>
                  <p className="text-[20px] max-[768px]:text-[18px]  text-[#101828] mb-4 font-medium md:leading-[2rem]">
                    {mobileAppData.banner.description}
                  </p>
                  <RegisterYourIntrest />

                  {/* {mobileAppData.banner.buttons.length !== 0 &&
                  mobileAppData.banner.buttons.map(
                    (button: any, index: number) => {
                      return (
                        <Link
                          key={button?.id}
                          className="bg-[#298DFE] text-white px-[24px] py-[12px] text-base font-bold rounded-lg mr-2"
                          href={button.link}
                        >
                          {button.title}
                        </Link>
                      );
                    }
                  )} */}
                  {/* <p className="text-xl text-gray-900 mt-4  font-weight-600">
                  Download the app
                </p>
                <p className="text-[14] text-gray-600 mb-4">
                  Get the most of Untitled by installing our new mobile app.
                </p>
                <div className="d-flex">
                  <Link className="mr-2" href={"#"}>
                    <Image
                      alt="image"
                      width={150}
                      height={50}
                      style={{}}
                      className="!height-[50]"
                      src="/images/svgs/applestore.svg"
                      unoptimized={false}
                    />
                  </Link>
                  <Link href={"#"}>
                    <Image
                      alt="image"
                      width={150}
                      height={50}
                      className="!height-[50]"
                      style={{ height: "50px" }}
                      src="/images/svgs/playstore.svg"
                      unoptimized={false}
                    />
                  </Link>
                </div> */}
                </Container>
              </Col>
              <Col
                md={6}
                className={`${styles["banner-img-col"]} gradient-img-banner`}
              >
                <Image
                  alt="image"
                  width={mobileAppData.banner.image.width}
                  height={mobileAppData.banner.image.height}
                  style={{}}
                  src={imgPath(mobileAppData.banner.image.url)}
                  unoptimized={false}
                />
              </Col>
            </Row>
          </div>
        </div>
      )}
      {/* <Banner
        title={mobileAppData.banner.title}
        description={mobileAppData.banner.description}
        ImgURL={imgPath(
          mobileAppData.banner.image.url
        )}
        bannerButtons={mobileAppData.banner.buttons}
        unoptomize={false}
      /> */}
      {SwapAssets && (
        <div className="wrapped-gradient wrapped-gradient-mobile-app py-[40px] background-image-content">
          <LeftColImage
            borderButtons={[]}
            primaryButtons={[]}
            imgUrl={imgPath(SwapAssets.image.url)}
            title={SwapAssets.heading}
            description={SwapAssets.description}
          />
        </div>
      )}
      {BridgeAssests && (
        <div className="wrapped-gradient wrapped-gradient-mobile-app py-[40px]">
          <RightColImage
            borderButtons={[]}
            primaryButtons={[]}
            imgUrl={imgPath(BridgeAssests.image.url)}
            title={BridgeAssests.heading}
            description={BridgeAssests.description}
          />
        </div>
      )}
    </>
  );
}
