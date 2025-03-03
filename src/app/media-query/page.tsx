import { fetchData } from "@/app/_utils/ServerApis";
import BlogCard, { imgPath } from "@/app/components/blog-card/blogCard";
import Banner from "@/app/components/pageBanner/banner";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import Image from "next/image";
import { Metadata } from "next";
import Script from "next/script";
import SubscribeForm from "../components/subscribe-form/subscribe-form";
import Link from "next/link";

// This function fetches metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const aboutData: any = await fetchData("media-query?populate=meta_tags");

  const Metatag: any = aboutData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
const body = {
  headers: {
    Authorization: `Bearer ${process.env.strapi_api_token}`,
  },
};
export default async function MediaQuery() {
  let mediaData: any = null;
  try {
    const data: any = await fetchData(
      "/media-query?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*"
    );
    if (!data) {
      throw new Error("No data found");
    }
    mediaData = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3 className="text-[22px]">No data found</h3>
      </div>
    );
  }
  if (!mediaData) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const OurAffiliatedProjects: any = mediaData?.our_affiliated_projects;
  const blogsData: any = await fetchData(
    "/blogs?populate=*&pagination[limit]=3&sort[0]=createdAt:desc"
  );
  const socialLinksData: any = await fetchData(
    "media-query?populate[socialmedia_queries][populate][image]=*"
  );
  const socialLinks = socialLinksData.socialmedia_queries;

  // console.log(blogsData);
  return (
    <>
      <>
        {/* {mediaData?.banner && (
          <div className="wrapped-gradient-banner">
            <Banner
              title={mediaData.banner.title}
              description={mediaData.banner.description}
              ImgURL={imgPath(mediaData.banner.image.url)}
              bannerButtons={[]}
              unoptomize={false}
              height={mediaData.banner.image.height}
              width={mediaData.banner.image.width}
            />
          </div>
        )} */}
        <section className="upper-footer py-[48px]">
          <Container>
            <Card className="p-4 border border-[#EAECF0] rounded-[16px]">
              <Row>
                <Col md={5}>
                  <h3 className="text-[30px] max-[768px]:text-[22px] font-semibold text-[#101828]">
                    Got Questions? Let&apos;s Talk
                  </h3>
                  <br />
                  <p className="text-[#475467] text-[16px] max-[768px]:text-[16px]">
                    Whether you&apos;re curious about the technology driving
                    ARMswap, eager to discuss its role in DeFi space, or
                    interested in learning more about our vision, were here to
                    assist. Drop us an{" "}
                    <a
                      className="text-[#298dfd]"
                      href="mailto:Support@armswap.com"
                    >
                      support@armswap.com
                    </a>
                  </p>
                  <br />
                  <a target="_blank" href="https://docs.armswap.com">
                    <Image
                      width={175}
                      height={24}
                      src="/images/footer/gitbook.svg"
                      alt="image"
                    />
                  </a>
                  <br />
                  <h3 className="text-[30px] max-[768px]:text-[22px] font-semibold text-[#101828]">
                    Media Query
                  </h3>
                  <br />
                  <p className="text-[#475467] text-[16px] max-[768px]:text-[16px]">
                    Join the ARMswap community and ask away!
                  </p>
                  <br />
                  <>
                    {socialLinks?.map((item: any, i: number) => {
                      return (
                        <a
                          className="flex p-[10px] gap-3"
                          href={item?.url}
                          key={i}
                        >
                          <Image
                            className="color-change"
                            width={24}
                            height={24}
                            src={imgPath(item?.image?.url)}
                            alt="image"
                          />
                          <span className="text-[#298DFE] font-[600] text-[16px] leading-[24px]">
                            {item?.title}
                          </span>
                        </a>
                      );
                    })}
                  </>
                </Col>
                <Col md={1}></Col>
                <Col md={6} className=" cool">
                  <div>
                    <h3 className=" text-left text-[30px] max-[768px]:text-[22px] font-semibold text-[#101828]">
                      Contact us
                    </h3>
                  </div>
                  <>
                    <iframe
                      src="https://help.armswap.com/custom-ticket"
                      style={{ border: "none", width: "100%", height: "540px" }}
                    ></iframe>
                    <h3 className="text-[#101828]  text-[30px] max-[768px]:text-[22px] font-bold leading-[38px]">
                      Join the ARMswap Vibrant Community
                    </h3>
                    <p className="text-[#475467]  text-[16px] font-normal leading-[30px]">
                      Join Now For Exclusive Early Access
                    </p>
                    <SubscribeForm />
                    <p className="text-[#475467]  text-[12px] font-normal leading-[20px]">
                      We care about your data read our{" "}
                      <a
                        className="text-[#4389da]"
                        href={`${process.env.NEXT_PUBLIC_WEB_URL}/privacy-policy`}
                      >
                        privacy policy.
                      </a>
                    </p>
                    {/* {htmlContent ? (
                      <section className="w-full my-[20px] contact-us-subscribe">
                        <Container>
                          <Row>
                            <Col md={12}>
                              <div
                                className="my-3"
                                dangerouslySetInnerHTML={{
                                  __html: htmlContent,
                                }}
                              />
                            </Col>
                          </Row>
                        </Container>
                      </section>
                    ) : (
                      <></>
                    )} */}
                  </>
                </Col>
              </Row>
            </Card>
          </Container>
        </section>
        {blogsData && (
          <section className="py-[40px]">
            <Container>
              <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] text-center font-bold py-[20px]">
                Our Featured Articles
              </h2>
              <Row>
                {blogsData?.map((blog: any, index: number) => {
                  return (
                    <Col md={4} key={blog.id} className="pb-4">
                      <BlogCard blog={blog} />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </section>
        )}
        {OurAffiliatedProjects && (
          <section className="py-[40px]">
            <Container>
              <div className="bg-light-grey">
                <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] text-center font-bold ">
                  {OurAffiliatedProjects.heading}
                </h2>
                <div className="bg-projects-upper">
                  <div className="bg-projects flex justify-around items-center">
                    <>
                      {OurAffiliatedProjects.roadmap_cards.map(
                        (item: any, index: number) => {
                          return (
                            <div key={item?.id}>
                              <Image
                                key={index}
                                className="px-[10px]"
                                src={imgPath(item?.image.url)}
                                alt={item.title}
                                width={
                                  item?.image.width > 300
                                    ? 170
                                    : item?.image.width < 100
                                    ? 100
                                    : item?.image.width
                                }
                                height={
                                  item?.image.height > 300
                                    ? 170
                                    : item?.image.height
                                }
                              />
                            </div>
                          );
                        }
                      )}
                    </>
                  </div>
                  <br />
                  <br />
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
              </div>
            </Container>
          </section>
        )}
      </>
    </>
  );
}
