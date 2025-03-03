import FAQs from "@/app/components/faq/faq";
import Image from "next/image";
import { Badge, Col, Container, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Markdown_Img from "@/app/components/markdown-img/markdown-img";
import rehypeRaw from "rehype-raw";
import { fetchData } from "@/app/_utils/ServerApis";
import { Metadata } from "next";
import SubscribeForm from "@/app/components/subscribe-form/subscribe-form";
import Head from "next/head";
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const aboutData: any = await fetchData(
    `/blogs?filters[slug][$eq]=${params.id}&populate[meta_tags]=*`
  );

  const Metatag: any = aboutData[0]?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function SingleBlog({ params }: any) {
  // const blogData = await fetchBlog(params.id);
  const x: any = await fetchData(
    `/blogs?filters[slug][$eq]=${params.id}&populate[image]=*&populate[contributors][populate][image]=*&populate[categories]=*&populate[meta_tags]=*`
  );
  let blogData = x[0];
  const imgPath = (text: string) => {
    // console.log("text :", blogData);
    if (text) return `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${text}`;
    else return `/images/svgs/question.svg`;
  };
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_WEB_URL}`,
    },
    headline: blogData?.title || "Default title",
    image: imgPath(blogData?.image?.url) || "https://abc.com",
    author: {
      "@type": "Organization",
      name: "ARMswap",
      url: `${process.env.NEXT_PUBLIC_WEB_URL}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Organisation",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_WEB_URL}`,
      },
    },
    datePublished: blogData?.publishedAt || "2024-10-21",
    dateModified: blogData?.updatedAt || "2024-10-21",
  };
  const breadcrumbListSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home page",
        item: `${process.env.NEXT_PUBLIC_WEB_URL}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learn",
        item: `${process.env.NEXT_PUBLIC_WEB_URL}/learn`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Blogs",
        item: `${process.env.NEXT_PUBLIC_WEB_URL}/learn/blogs`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: blogData?.title || "Default title",
        item: `${process.env.NEXT_PUBLIC_WEB_URL}/learn/blogs/${params.id}`, // Adjust based on the blog slug
      },
    ],
  };

  return (
    <>
      <Head>
        {/* Adding the JSON-LD schema */}
        <script
          id="gtm-script"
          // strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
        <script
          id="gtm-script"
          // strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbListSchema),
          }}
        />
      </Head>
      {blogData && (
        <Container className="py-[40px]">
          {/* <p className="text-[#475467] text-lg">
            {blogData?.description[0].children[0].text}
          </p> */}
          <h1 className="text-[48px] max-[768px]:text-[26px]  font-semibold leading-[60px] max-[768px]:leading-[34px]">
            {blogData?.title}
          </h1>
          <br />
          <div className="py-[10px]">
            <>
              {blogData?.contributors?.length !== 0 &&
                blogData?.contributors?.map((item: any, index: number) => {
                  //   console.log("item", item);
                  return (
                    <div
                      className="flex items-center gap-2 pt-[15px]"
                      key={index + item.image?.url}
                    >
                      <Image
                        className="rounded-full"
                        height={48}
                        width={48}
                        src={imgPath(item.image?.url)}
                        alt={item.name}
                      />
                      <div>
                        <h6 className="text-base font-semibold text-[#344054]">
                          {item.name}
                        </h6>
                        <p className="text-[20px] max-[768px]:text-[18px] text-[#475467]">
                          {item.designation}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </>
          </div>
          <br />

          <div className=" overflow-hidden">
            <Image
              src={imgPath(blogData?.image?.url)}
              height={628}
              width={1208}
              className="w-full rounded-3xl"
              alt="image"
            />
          </div>
          <div className="flex py-[25px] ">
            {blogData?.categories?.map((category: any, i: number) => {
              return (
                <Badge
                  className="!bg-[#EAF4FF] !text-[#298DFE] !text-[14px] m-[2px] rounded-[16px] font-[500]"
                  key={i + category?.name}
                >
                  {category?.name}
                </Badge>
              );
            })}
          </div>

          <Row className="py-[40px]">
            <Col md={8}>
              <div className="pb-[40px] blog-detail-markdown">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    img: (props) => (
                      <Markdown_Img
                        src={props.src as string}
                        alt={props.alt as string}
                      />
                    ),
                  }}
                >
                  {blogData?.blog_body}
                </ReactMarkdown>
              </div>
            </Col>
            <Col md={4} className="sticky-blog ">
              <div className="p-[32px] bg-[#F9FAFB] text-[#101828] mb-2">
                <Image
                  src={"/send-mail.svg"}
                  height={56}
                  width={56}
                  alt="send"
                />
                <br />
                <h3 className="text-[22px] max-[600px]:text-[22px] leading-[40px] font-semibold leading-8">
                  Weekly newsletter
                </h3>
                <br />
                <p className="text-base leading-6 text-[20px] max-[768px]:text-[18px]">
                  No spam. Just the latest releases and tips, interesting
                  articles, and exclusive interviews in your inbox every week.
                </p>
                <div className="subscribe-blog">
                  <SubscribeForm />
                </div>
              </div>
              <hr />
            </Col>
          </Row>
          {blogData?.faqs?.length > 0 && <FAQs questions={blogData.faqs} />}
        </Container>
      )}
    </>
  );
}
