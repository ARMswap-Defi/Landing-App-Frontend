import Banner from "../components/pageBanner/banner";
import { Container, Spinner } from "react-bootstrap";
import FeatureBanner from "../components/feature-banner/featureBanner";
import FAQs from "../components/faq/faq";
import { imgPath } from "../components/blog-card/blogCard";
import HeadingDescriptionImage from "../components/heading-description-image/heading-description-image";
import TokenAddress from "../components/token-address/page";
import { fetchData } from "@/app/_utils/ServerApis";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const aboutData: any = await fetchData("token?populate[meta_tags]=*");

  const Metatag: any = aboutData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function Token() {
  let tokenData: any = null;
  let isLoading = true;
  try {
    const data: any = await fetchData(
      "token?populate[tokens_address][populate][coins][populate]=image&populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[faqs]=*&populate[armswap_fairy_launch][populate]=image&populate[armswap_allocation][populate]=image&populate[armsp_token_roadmaps]=*&populate[meta_tags]=*"
    );
    if (!data) {
      throw new Error("No data found");
    }
    tokenData = data;
    isLoading = false;
  } catch (error: any) {
    isLoading = false;
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3 className="text-[22px]">No data found</h3>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (!tokenData) {
    return (
      <div className="text-center py-5">
        <h3 className="text-[22px]">No data found or error occurred</h3>
      </div>
    );
  }
  return (
    <>
      {isLoading ? (
        // Show the spinner while loading
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // Full viewport height to center vertically
          }}
          className="text-center my-5"
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {tokenData?.banner ? (
            <div className="wrapped-gradient-banner banner-extra-padding token-page-banner">
              <Banner
                title={tokenData?.banner.title}
                description={tokenData?.banner.description}
                ImgURL={imgPath(tokenData?.banner.image.url)}
                bannerButtons={tokenData?.banner.buttons}
                unoptomize={false}
                height={tokenData?.banner.image.height}
                width={tokenData?.banner.image.width}
              />
            </div>
          ) : null}
          {tokenData?.tokens_address ? (
            <TokenAddress
              title={tokenData?.tokens_address.title}
              address={tokenData?.tokens_address.coins}
            />
          ) : null}
          {tokenData?.armsp_token_roadmaps ? (
            <FeatureBanner roadmapData={tokenData?.armsp_token_roadmaps} />
          ) : null}
          {tokenData?.armswap_allocation ? (
            <section className="py-[40px] max-[768px]:py-[20px]">
              <HeadingDescriptionImage
                title={tokenData?.armswap_allocation?.heading}
                description={tokenData?.armswap_allocation?.description}
                imagesData={tokenData?.armswap_allocation?.image?.url}
                headingColor=""
              />
            </section>
          ) : null}
          {tokenData?.armswap_fairy_launch ? (
            <section className="pt-[40px] max-[768px]:pt-[20px]">
              <HeadingDescriptionImage
                title={tokenData?.armswap_fairy_launch?.heading}
                description={tokenData?.armswap_fairy_launch?.description}
                imagesData={""}
                headingColor=""
              />
            </section>
          ) : null}
          <br />

          {/* <Container>
            <div className="overflow-x-auto">
              <h4 className=" p-[7px] text-[20px] font-semibold leading-[30px] text-center">
                Token Sale Phases on PinkSale
              </h4>
              <table
                style={{ borderSpacing: "8px", borderCollapse: "separate" }}
                className="min-w-full table-auto text-center"
              >
                <thead>
                  <tr>
                    <th
                      className="py-3 min-w-[150px]"
                      style={{ backgroundColor: "#268ffd", color: "white" }}
                    >
                      Phases
                    </th>
                    <th
                      className=" px-4 py-3 max-w-[231px] min-w-[150px]"
                      style={{ backgroundColor: "#268ffd", color: "white" }}
                    >
                      ARMSP Tokens Available for Sale
                    </th>
                    <th
                      className=" px-4 py-3 max-w-[159px] min-w-[150px]"
                      style={{ backgroundColor: "#ff9f48", color: "white" }}
                    >
                      Affiliate Bonus
                    </th>

                    <th
                      className=" px-4 py-3 max-w-[188px] min-w-[150px]"
                      style={{ backgroundColor: "#eaf4fe", color: "#318bf3" }}
                    >
                      Max Contribution
                    </th>
                    <th
                      className=" px-4 py-3 max-w-[188px] min-w-[150px]"
                      style={{ backgroundColor: "#eaf4fe", color: "#318bf3" }}
                    >
                      Pink Sale
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className=" bg-[#1e334e] text-white text-bold px-3 py-2">
                      <span className="block">Phase 1</span>
                      <span className="block">21 JAN 2025</span>
                    </td>
                    <td className="bg-[#f2f0f1] text-[#717578]">1 million</td>
                    <td className="bg-[#f2f0f1] text-[#717578]">03%</td>
                    <td className="bg-[#eaf4fe]">15 BNB</td>
                    <td className="bg-[#eaf4fe]">
                      <a
                        href="https://www.pinksale.finance/launchpad/bsc/0x35FD6CCB662E5Ea865575143433DB18f0a79bbfb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Buy Now
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className=" bg-[#1e334e] text-white text-bold px-3 py-2">
                      <span className="block">Phase 2</span>
                      <span className="block">Coming soon</span>
                    </td>
                    <td className="bg-[#f2f0f1] text-[#717578]">1 million</td>
                    <td className="bg-[#f2f0f1] text-[#717578]">03%</td>
                    <td className="bg-[#eaf4fe]">15 BNB</td>
                    <td className="bg-[#eaf4fe]">Coming soon</td>
                  </tr>
                  <tr>
                    <td className=" bg-[#1e334e] text-white text-bold px-3 py-2">
                      Total
                    </td>
                    <td className="bg-[#f2f0f1] font-bold">
                      2 million
                      <br /> (0.5% of Public Sale Allocation)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Container>
          <br /> */}

          <Container>
            <div className="overflow-x-auto">
              <h4 className=" p-[7px] text-[20px] font-semibold leading-[30px] text-center">
                Exclusive Token Sale on Our Platform
              </h4>
              <table
                style={{ borderSpacing: "8px", borderCollapse: "separate" }}
                className="min-w-full table-auto text-center"
              >
                <thead>
                  <tr>
                    <th
                      className="min-w-[150px]"
                      style={{ backgroundColor: "#268ffd", color: "white" }}
                    >
                      Phases
                    </th>
                    <th
                      className=" px-4 max-w-[231px] min-w-[150px]"
                      style={{ backgroundColor: "#268ffd", color: "white" }}
                    >
                      ARMSP Tokens Available for Sale
                    </th>
                    <th
                      className=" px-4 max-w-[159px] min-w-[150px]"
                      style={{ backgroundColor: "#ff9f48", color: "white" }}
                    >
                      Bonus
                    </th>
                    <th
                      className=" px-4 max-w-[143px] min-w-[150px]"
                      style={{ backgroundColor: "#eaf4fe", color: "#318bf3" }}
                    >
                      Price
                    </th>
                    <th
                      className=" px-4 max-w-[188px] min-w-[150px]"
                      style={{ backgroundColor: "#eaf4fe", color: "#318bf3" }}
                    >
                      Minimum Token Purchase
                    </th>
                    <th
                      className=" px-4 max-w-[188px] min-w-[150px]"
                      style={{ backgroundColor: "#eaf4fe", color: "#318bf3" }}
                    >
                      Maximum Token Purchase
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className=" bg-[#1e334e] text-white text-bold px-3 py-2">
                      <span className="block">Phase 1</span>
                      <span className="block">07 JAN 2025</span>
                    </td>
                    <td className="bg-[#f2f0f1] text-[#717578]">158 million</td>
                    <td className="bg-[#f2f0f1] text-[#717578]">15.0%</td>
                    <td className="bg-[#eaf4fe]">€1</td>
                    <td className="bg-[#eaf4fe]">10</td>
                    <td className="bg-[#eaf4fe]">10,000</td>
                  </tr>
                  <tr>
                    <td className=" bg-[#1e334e] text-white text-bold px-3 py-2">
                      <span className="block">Phase 2</span>
                      <span className="block">07 APR 2025</span>
                    </td>
                    <td className="bg-[#f2f0f1] text-[#717578]">120 million</td>
                    <td className="bg-[#f2f0f1] text-[#717578]">10.0%</td>
                    <td className="bg-[#eaf4fe]">€1.10</td>
                    <td className="bg-[#eaf4fe]">10</td>
                    <td className="bg-[#eaf4fe]">10,000</td>
                  </tr>
                  <tr>
                    <td className=" bg-[#1e334e] text-white text-bold px-3 py-2">
                      <span className="block">Phase 3</span>
                      <span className="block">07 JUL 2025</span>
                    </td>
                    <td className="bg-[#f2f0f1] text-[#717578]">80 million</td>
                    <td className="bg-[#f2f0f1] text-[#717578]">5.0%</td>
                    <td className="bg-[#eaf4fe]">€1.20</td>
                    <td className="bg-[#eaf4fe]">10</td>
                    <td className="bg-[#eaf4fe]">10,000</td>
                  </tr>
                  <tr>
                    <td className=" bg-[#1e334e] text-white text-bold px-3 py-2">
                      <span className="block">Phase 4</span>
                      <span className="block">07 OCT 2025</span>
                    </td>
                    <td className="bg-[#f2f0f1] text-[#717578]">40 million</td>
                    <td className="bg-[#f2f0f1] text-[#717578]">2.5%</td>
                    <td className="bg-[#eaf4fe]">€1.30</td>
                    <td className="bg-[#eaf4fe]">10</td>
                    <td className="bg-[#eaf4fe]">10,000</td>
                  </tr>
                  <tr>
                    <td className=" bg-[#1e334e] text-white text-bold px-3 py-2">
                      Total
                    </td>
                    <td className="bg-[#f2f0f1] font-bold">
                      400 million
                      <br /> (32% of Total Supply)
                    </td>
                    <td className=""></td>
                    <td className=""></td>
                    <td className=""></td>
                    <td className="bg-[#eaf4fe] font-bold">40,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="lg:w-[60%] mx-auto ">
              <p className="text-[20px] max-[768px]:text-[18px] leading-[30px] text-center pt-[20px]">
                Upon each purchase users will be eligible for bonus. For
                instance, during phase 1, any purchase of ARMSP tokens qualifies
                for a 15% bonus.
              </p>
              <p className="text-[20px] max-[768px]:text-[18px] leading-[30px] text-center pt-[20px]">
                The maximum limit for purchasing tokens is 10,000 tokens. If a
                user wishes to this point a purchase more than 10,000 tokens,
                they are required to contact ARMswap via email{" "}
                <a className="text-[#298dfd]" href="mailto:Support@armswap.com">
                  support@armswap.com
                </a>{" "}
                or{" "}
                <a
                  className="text-[#4389da]"
                  target="_blank"
                  href="https://help.armswap.com/"
                >
                  {" "}
                  ARMswap help
                </a>{" "}
                to proceed with the purchase.
              </p>
            </div>
          </Container>
          {tokenData?.faqs ? (
            <Container className="py-[40px] token-faq">
              <FAQs questions={tokenData?.faqs} />
            </Container>
          ) : null}
        </>
      )}
    </>
  );
}
