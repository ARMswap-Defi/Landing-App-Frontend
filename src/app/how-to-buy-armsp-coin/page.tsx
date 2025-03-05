import { fetchData } from "@/app/_utils/ServerApis";
import { imgPath } from "@/app/components/blog-card/blogCard";
import Banner from "@/app/components/pageBanner/banner";
import { Container, Spinner } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Markdown_Img from "@/app/components/markdown-img/markdown-img";
import { Metadata } from "next";

// This function fetches metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const aboutData: any = await fetchData(
    "buy-armswap-coin?populate[meta_tags]=*"
  );

  const Metatag: any = aboutData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}

export default async function BuyArmswapCoin() {
  let buyArmSwapCoinData: any = null;
  let howCanYouGetInvolved: any = null;

  await fetchData(
    "buy-armswap-coin?populate[banner][populate][image]=*&populate[how_can_you_get_involved][populate][cards]=*"
  )
    .then((data: any) => {
      if (!data) {
        throw new Error("No data found");
      }
      buyArmSwapCoinData = data;
      howCanYouGetInvolved = buyArmSwapCoinData.how_can_you_get_involved;
      // Handle successful data fetching (update state, etc.)
    })
    .catch((error: any) => {
      console.error("Error fetching data:", error.message);
      // Handle error (set state to display error message, etc.)
      return (
        <div className="text-center py-5">
          <h3>No data found</h3>
        </div>
      );
    });

  return (
    <>
      {!buyArmSwapCoinData ? (
        <div className="text-center py-[200px]">
          <Spinner animation="border" variant="primary" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {buyArmSwapCoinData?.banner && (
            <div className="wrapped-gradient-banner">
              <Banner
                title={buyArmSwapCoinData.banner.title}
                description={buyArmSwapCoinData.banner.description}
                ImgURL={imgPath(buyArmSwapCoinData.banner.image.url)}
                bannerButtons={[]}
                unoptomize={false}
                height={buyArmSwapCoinData.banner.image.height}
                width={buyArmSwapCoinData.banner.image.width}
              />
            </div>
          )}
          {buyArmSwapCoinData?.upper_content_custom && (
            <Container>
              <div className="buy-armsp-content py-[40px]">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  className="text-[20px] max-[768px]:text-[18px]"
                  components={{
                    // h1: ({ node, ...props }) => <h2 {...props} />,
                    img: (props) => (
                      <Markdown_Img
                        src={props.src as string}
                        alt={props.alt as string}
                      />
                    ),
                  }}
                >
                  {buyArmSwapCoinData.upper_content_custom}
                </ReactMarkdown>
              </div>
            </Container>
          )}

          {/* {howCanYouGetInvolved?.title && (
            <section className="py-[40px] bg-[#EFF6FD] token-card">
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
                boderWidth={0}
                align="start"
                cardsBackground={"#fff"}
                headingColor={"#298dfd"}
                cardTitleClr={"#000"}
                cardParagraphClr={"#444D57"}
              />
            </section>
          )} */}

          {buyArmSwapCoinData?.lower_content_custom && (
            <Container>
              <div className="buy-armsp-content">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    // h1: ({ node, ...props }) => <h2 {...props} />,
                    img: (props) => (
                      <Markdown_Img
                        src={props.src as string}
                        alt={props.alt as string}
                      />
                    ),
                  }}
                >
                  {buyArmSwapCoinData.lower_content_custom}
                </ReactMarkdown>
              </div>
            </Container>
          )}
        </>
      )}
    </>
  );
}
