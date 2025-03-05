"use client";
import Banner from "@/app/components/pageBanner/banner";
import { Section } from "@/app/types/types";
import { useEffect, useRef, useState } from "react";
import styles from "../../privacy-policy/privacy-policy.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import GlobalApi from "@/app/_utils/GlobalApi";
import { imgPath } from "@/app/components/blog-card/blogCard";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/app/components/breadcrum/breadcrum";
import NoDataFound from "@/app/components/no-data-found/no-data-found";
import { Helmet } from "react-helmet";

interface BannerData {
  id: number;
  title: string;
  description: string;
  image: any;
}
export default function KnowledgeBase() {
  const [bannerData, setBannerData] = useState<BannerData>();
  const [tabData, setTabData] = useState<any>();
  const [metatag, setMetatag] = useState<any>();

  const fetchKnowledgeBaseBanner = () => {
    GlobalApi.GetKnowledgeBaseBanner().then((resp) => {
      // console.log("data :", resp?.data?.data?.tab_knowledgebases);
      setBannerData(resp?.data?.data?.banner);
      setTabData(resp?.data?.data?.tab_knowledgebases);
      setMetatag(resp?.data?.data?.meta_tags);
    });
  };
  const sections: Section[] = [
    {
      id: "section1",
      title: "What information is collected?",
      content: `1.1. Information you give us. This is information about you that you give us by Creating a Token Swap on ChainPort.io.
        1.2. Each time you use ChainPort’s services the platform may automatically collect the following information: technical information, including the Internet protocol (IP) address used to connect your computer or other devices to the Internet, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform, and information about your visit, including the dates and times you use the Site length of visits to certain pages, page interaction information (such as scrolling, clicks, and mouse-overs), methods used to browse away from the page. Special categories of data:
        1.2.1. We do not collect any special categories of Personal Information about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health, and genetic and biometric data).
        1.2.2. We do not collect any information related to your wallet, including your keystore file, password, mnemonic phrase, and private key.`,
    },
    {
      id: "section2",
      title: "Purposes for which we collect your Personal Information.",
      content: `If you wish to transact on and use the Site or use the Services, ChainPort will collect information about you for the purposes set out below. Information you provide to us may be used to:
         2.1. establish and maintain a responsible commercial relationship with you;
         2.2. understand your needs and your eligibility for products and services;
         2.3. inform you about trading features;
         2.4. provide information to you about developments and new products, including changes and enhancements to the Site;
         2.5. develop, enhance, and market products and services, and provide products and services to you;
         2.6. process billing and collection of any fees;
         2.7. conduct surveys and get feedback from you;
         2.8. deliver products and services to you;
         2.9. provide you with news and other matters of general interest to you as a ChainPort user;
         2.10. to meet ChainPort's legal and regulatory requirements.
         ChainPort uses IP addresses to analyze trends, administer the Site, track user movements, and gather broad demographic information for aggregate use. For systems administration and detecting usage patterns and troubleshooting purposes, ChainPort 's web servers also automatically log standard access information including browser type, access times/open mail, URL requested, and referral URL. This information is not shared with third parties and is used only within ChainPort on a need-to-know basis. ChainPort reserves the right to block access for any user accessing the Site via a proxy service intending to conceal originating identity. This includes access via the Tor anonymity network.`,
    },
    {
      id: "section3",
      title: "Legal bases on which we process your Personal Information.",
      content: `3.1. We will process your Personal Information on the following grounds:
          3.1.1. where it is necessary for us to perform pursuant to our contract with you or in your interests; and/or
          3.1.2. where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests. Legitimate interests mean the interests of our organization to conduct and manage our business to enable us to better serve you and provide you with a secure experience on the Site.
          3.1.3. We ensure that we balance any potential impact on you and your rights before we process your Personal Information for our legitimate interests. We do not use your Personal Information for activities where our interests are overridden by the impact on you (unless we have your consent or are otherwise required or permitted to by law). You can obtain further information about how we assess our legitimate interests against any potential impact on you in respect of specific activities by contacting us.
          3.2. Generally, we do not rely on consent as a legal basis for processing your Personal Information other than in relation to our use of cookies or when we send third-party direct marketing communications to you anonymously.`,
    },
  ];
  const [popularArticles, setPopularArticles] = useState([]);

  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fetchPopularArticles = () => {
    GlobalApi.GetPopularArticles().then(async (resp) => {
      // console.log("data :", resp?.data?.data?.tab_knowledgebases);
      // console.log("articles", resp?.data?.data);
      setPopularArticles(resp?.data?.data);
    });
  };
  useEffect(() => {
    fetchKnowledgeBaseBanner();
    fetchPopularArticles();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref!);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref!);
      });
    };
  }, []);

  const handleHeadingClick = (id: string) => {
    const section = sectionRefs.current.find((ref) => ref?.id === id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };
  return (
    <>
      <Helmet>
        <title>{metatag?.title}</title>
        <meta name="description" content={metatag?.description} />
      </Helmet>
      {/* {bannerData ? (
        <Banner
          title={bannerData.title}
          description={bannerData.description}
          ImgURL={imgPath(bannerData.image.data.url)}
          bannerButtons={[]}
          unoptomize={false}
        />
      ) : null} */}
      {tabData ? (
        <div className="container mx-auto p-4">
          <Breadcrumb items={[{ name: "HOME", href: "/knowledge-base" }]} />
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="col-span-4  rounded-lg ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tabData.map((item: any, index: number) => {
                  // const category = encodeURIComponent(item.title);
                  return (
                    <Link
                      key={index}
                      className="cursor-pointer"
                      href={`/knowledge-base/${item.slug}`}
                      passHref
                    >
                      <div
                        key={index}
                        className="bg-[#EAF4FF] shadow-md rounded-lg p-4 "
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            alt="image"
                            width={70}
                            height={70}
                            style={{}}
                            src={imgPath(
                              item.image?.url
                            )}
                          />
                          <div className="w-2/3">
                            <h3 className="text-[22px] font-semibold mb-2">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 text-[20px] max-[768px]:text-[18px]">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="col-span-2 ">
              <div className="bg-[#EAF4FF] shadow-lg rounded-lg p-4 mb-4">
                <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] font-semibold mb-4">Popular Articles</h2>
                <ul className="space-y-4">
                  {popularArticles?.length > 0 ? (
                    <>
                      {popularArticles.map((item: any, index: number) => {
                        // const category = encodeURIComponent(item.title);
                        return (
                          <Link
                            key={item?.id}
                            href={`/knowledge-base/${item.slug}`}
                          >
                            <li>{item.title}</li>
                          </Link>
                        );
                      })}
                    </>
                  ) : (
                    <NoDataFound message="No article found" />
                  )}
                </ul>
              </div>
              <div className="bg-[#EAF4FF] shadow-lg rounded-lg p-4">
                <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] font-semibold mb-4">Need support?</h2>
                <p className="text-gray-600 text-[20px] max-[768px]:text-[18px]">
                  Can&apos;t find the answer you&apos;re looking for? We&apos;re
                  here to help!
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* <Container>
        <Row>
          <Col md={4} className="relative">
            <div
              className={`${styles.headingList} pt-[50px] sticky top-[20px]`}
            >
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`${styles.headingItem} ${
                    activeSection === section.id ? styles.active : ""
                  }`}
                  onClick={() => handleHeadingClick(section.id)}
                >
                  {section.title}
                </div>
              ))}
            </div>
          </Col>
          <Col md={8} className="relative ">
            <div>
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  id={section.id}
                  ref={(el) => {
                    sectionRefs.current[index] = el; // Correctly assign the ref without returning
                  }}
                  className={`${styles.sectionContent} `}
                >
                  <h2 className="pt-[65px] text-lg font-semibold">
                    {section.title}
                  </h2>
                  <div
                    className="text-base"
                    dangerouslySetInnerHTML={{
                      __html: section.content.replace(/\n/g, "<br />"),
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container> */}
    </>
  );
}
