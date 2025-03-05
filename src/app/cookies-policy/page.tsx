"use client";
import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import styles from "../privacy-policy/privacy-policy.module.scss";
import Banner from "../components/pageBanner/banner";
import GlobalApi from "../_utils/GlobalApi";
import { imgPath } from "../components/blog-card/blogCard";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Helmet } from "react-helmet";

export default function PrivacyPolicy() {
  const [bannerData, setBannerData] = useState<any>();
  const [metatag, setMetatag] = useState<any>();
  const [detail, setDetail] = useState<any>();
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Fetch data logic
  const fetchPrivacyPolicyTabs = () => {
    setLoading(true);
    setError(false);
    GlobalApi.GetCookiesPolicy()
      .then((resp) => {
        const attributes = resp?.data?.data;
        if (!attributes) {
          setError(true);
        } else {
          setBannerData(resp?.data?.data?.banner);
          setMetatag(resp?.data?.data?.meta_tags);
          setDetail(resp?.data?.data?.detail);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    fetchPrivacyPolicyTabs();
  }, []);

  // Extract headings
  useEffect(() => {
    if (contentRef.current) {
      const elements = Array.from(
        contentRef.current.querySelectorAll("h2, h3, h1, h4, h5, h6")
      );
      const headingsArray = elements.map((el, index) => {
        const id = `heading-${index}`;
        el.id = id;
        return { id, text: el.textContent || "" };
      });
      setHeadings(headingsArray);
    }
  }, [detail]);

  // Scroll to specific heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Adjust this value for desired space at top
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Highlight the active heading based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const headingElements = Array.from(
          contentRef.current.querySelectorAll("h2, h3, h1, h4, h5, h6")
        );
        let currentHeading = null;

        for (let i = 0; i < headingElements.length; i++) {
          const heading = headingElements[i];
          const nextHeading = headingElements[i + 1];
          const headingTop = heading.getBoundingClientRect().top;
          const nextHeadingTop = nextHeading
            ? nextHeading.getBoundingClientRect().top
            : Infinity;

          if (
            headingTop <= window.innerHeight / 2 &&
            nextHeadingTop > window.innerHeight / 2
          ) {
            currentHeading = heading.id;
            break;
          }
        }

        setActiveHeading(currentHeading);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll sidebar to active heading
  useEffect(() => {
    if (activeHeading) {
      const activeElement = document.getElementById(activeHeading);
      const sidebar: any = document.querySelector(`.${styles.headingList}`);

      if (activeElement && sidebar) {
        const activeElementTop = activeElement.offsetTop;
        const sidebarHeight = sidebar.offsetHeight;
        sidebar.scrollTop = activeElementTop - sidebarHeight / 2 + 50; // Adjusting for centering
      }
    }
  }, [activeHeading]);

  return (
    <>
      <Helmet>
        <title>{metatag?.title}</title>
        <meta name="description" content={metatag?.description} />
      </Helmet>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div className="text-center my-5">
          <Alert variant="danger">No data found. Please try again later.</Alert>
        </div>
      ) : (
        <>
          {bannerData && (
            <div className="wrapped-gradient-banner">
              <Banner
                title={bannerData.title}
                description={bannerData.description}
                ImgURL={imgPath(bannerData.image.url)}
                bannerButtons={[]}
                unoptomize={false}
                height={442}
                width={445}
              />
            </div>
          )}

          <Container>
            <Row>
              {/* Sidebar with headings */}
              <Col md={4} className="relative">
                <div
                  className={`${styles.headingList} pt-12 sticky top-10 max-h-[calc(100vh-100px)] overflow-y-auto`}
                >
                  <ul className="side-bar-head">
                    {headings.map((heading) => (
                      <li
                        key={heading.id}
                        onClick={() => {
                          scrollToHeading(heading.id);
                          setActiveHeading(heading.id); // Ensure active state is set
                        }}
                        className={`cursor-pointer py-2 px-4 ${
                          activeHeading === heading.id ? "active" : ""
                        }`}
                      >
                        {heading.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>

              {/* Content Section */}
              <Col md={8} ref={contentRef} className="pt-[24px] privacy-terms-conditions-cookies-data">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {detail}
                </ReactMarkdown>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
