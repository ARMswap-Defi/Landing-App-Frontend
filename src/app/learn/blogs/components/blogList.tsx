"use client";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import BlogCard, { imgPath } from "@/app/components/blog-card/blogCard";
import { useEffect, useState } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Helmet } from "react-helmet";
import PaginationComponent from "@/app/components/pagination/paginationComponent";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
const TruncString = (text: string) => {
  return text.length > 80 ? text.substring(0, 100) + "..." : text;
};
export default function Blogs() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryTabs, setCategoryTabs] = useState([]);
  const [blogsData, setBlogsData] = useState([]);
  const [trendingBlogsData, setTrendingBlogsData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState({
    categories: true,
    blogs: true,
    trendingBlogs: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startBlog, setStartBlog] = useState(1);
  const [endBlog, setEndBlog] = useState(9);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const router = useRouter();
  const fetchCategoryList = () => {
    setLoading((prev) => ({ ...prev, categories: true }));
    GlobalApi.GetCategoriesTabs().then((resp) => {
      setCategoryTabs(resp?.data?.data);
      setLoading((prev) => ({ ...prev, categories: false }));
    });
  };
  // const fetchBlogs = () => {
  //   setLoading((prev) => ({ ...prev, blogs: true }));
  //   GlobalApi.GetBlogs().then((resp) => {
  //     setBlogsData(resp?.data?.data);
  //     setLoading((prev) => ({ ...prev, blogs: false }));
  //   });
  // };
  const fetchBlogs = (page: number = 1) => {
    setLoading((prev) => ({ ...prev, blogs: true }));
    GlobalApi.GetBlogs(page).then((resp) => {
      setBlogsData(resp?.data?.data);
      setTotalPages(resp?.data?.meta?.pagination?.pageCount || 1);
      setTotalBlogs(resp?.data?.meta?.pagination?.total || 0);
      setLoading((prev) => ({ ...prev, blogs: false }));
    });
  };
  // const fetchSelectedBlogs = (category: string) => {
  //   setLoading((prev) => ({ ...prev, blogs: true }));
  //   GlobalApi.GetSelectedBlogs(category).then((resp) => {
  //     setBlogsData(resp?.data?.data);
  //     setLoading((prev) => ({ ...prev, blogs: false }));
  //   });
  // };
  const fetchSelectedBlogs = (category: string, page: number = 1) => {
    setLoading((prev) => ({ ...prev, blogs: true }));
    GlobalApi.GetSelectedBlogs(category, page).then((resp) => {
      setBlogsData(resp?.data?.data);
      setTotalBlogs(resp?.data?.meta?.pagination?.total || 0);
      setTotalPages(resp?.data?.meta?.pagination?.pageCount || 1);
      setLoading((prev) => ({ ...prev, blogs: false }));
    });
  };
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      if (activeCategory === "all") {
        fetchBlogs(page);
      } else {
        fetchSelectedBlogs(activeCategory, page);
      }
      router.push(`?page=${page}`, undefined, { shallow: true });
    }
  };
  // const handlePageChange = (page: number) => {
  //   if (page > 0 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };
  const fetchTrendingBlogs = () => {
    setLoading((prev) => ({ ...prev, trendingBlogs: true }));
    GlobalApi.GetTrendingBlogs().then((resp) => {
      setTrendingBlogsData(resp?.data?.data);
      setLoading((prev) => ({ ...prev, trendingBlogs: false }));
    });
  };
  // useEffect(() => {
  //   fetchCategoryList();
  //   fetchBlogs();
  //   fetchTrendingBlogs();
  // }, []);
  useEffect(() => {
    fetchCategoryList();
    fetchTrendingBlogs();
  }, []);
  useEffect(() => {
    // Get page number from the URL if available
    const pageFromUrl = parseInt(router.query.page as string, 10) || 1;
    setCurrentPage(pageFromUrl);

    // Fetch blogs based on the page number and category
    if (activeCategory === "all") {
      fetchBlogs(pageFromUrl);
    } else {
      fetchSelectedBlogs(activeCategory, pageFromUrl);
    }
  }, [router.query.page, activeCategory]);

  // useEffect(() => {
  //   fetchBlogs(currentPage);
  // }, [currentPage]);
  useEffect(() => {
    if (activeCategory === "all") {
      fetchBlogs(currentPage);
    } else {
      fetchSelectedBlogs(activeCategory, currentPage);
    }
  }, [currentPage, activeCategory]);

  // useEffect(() => {
  //   const newStart = (currentPage - 1) * 9 + 1;
  //   const newEnd = Math.min(currentPage * 9, totalBlogs);
  //   setStartBlog(newStart);
  //   setEndBlog(newEnd);
  // }, [currentPage, totalBlogs]);
  useEffect(() => {
    if (totalBlogs > 0) {
      const newStart = (currentPage - 1) * 9 + 1;
      const newEnd = Math.min(currentPage * 9, totalBlogs);
      setStartBlog(newStart);
      setEndBlog(newEnd);
    } else {
      setStartBlog(0);
      setEndBlog(0);
    }
  }, [currentPage, totalBlogs, activeCategory]);

  return (
    <>
      <Helmet>
        <title> Expert Insights & Updates | ARMswap Blog</title>
        <meta
          name="description"
          content="Explore the ARMswap Blog for expert insights, latest updates, and guides on cross-chain bridging, swapping, and blockchain innovation. Stay informed with us."
        />
      </Helmet>
      <Container>
        <div className="hidden md:flex pt-[25px] overflow-x-auto">
          {loading.categories ? (
            <p>Loading categories...</p>
          ) : (
            <>
              <Button
                className={`blog-tabs mb-[5px] ${
                  activeCategory === "all" ? "active-category-tab" : ""
                }`}
                onClick={() => {
                  setCurrentPage(1); // Reset page number when changing category
                  fetchBlogs(1);
                  setActiveCategory("all");
                }}
              >
                All
              </Button>
              {categoryTabs.map((item: any, index: number) => (
                <Button
                  className={`blog-tabs mb-[5px] ${
                    activeCategory === item.name ? "active-category-tab" : ""
                  }`}
                  onClick={() => {
                    setCurrentPage(1); // Reset page number when changing category
                    fetchSelectedBlogs(item.name, 1);
                    setActiveCategory(item.name);
                  }}
                  key={item.id + index}
                >
                  {item.name}
                </Button>
              ))}
            </>
          )}
        </div>
        {!loading.categories && (
          <div className="md:hidden flex items-end flex-col pt-[25px] relative blog-mob-filter ">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="transparent"
              className="flex border-btn-link bg-transparent hollow-button border border-[#298DFE] text-[#298DFE] p-2 text-base font-bold rounded-lg  justify-around w-[130px]"
            >
              <span>Filters</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 64 64"
                stroke-width="3"
                stroke="#298DFE"
                fill="none"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <line x1="50.69" y1="32" x2="56.32" y2="32" />

                  <line x1="7.68" y1="32" x2="38.69" y2="32" />

                  <line x1="26.54" y1="15.97" x2="56.32" y2="15.97" />

                  <line x1="7.68" y1="15.97" x2="14.56" y2="15.97" />

                  <line x1="35" y1="48.03" x2="56.32" y2="48.03" />

                  <line x1="7.68" y1="48.03" x2="23" y2="48.03" />

                  <circle cx="20.55" cy="15.66" r="6" />

                  <circle cx="44.69" cy="32" r="6" />

                  <circle cx="29" cy="48.03" r="6" />
                </g>
              </svg>
            </Button>
            {isOpen && (
              <div className="cat-filter-dropdown">
                <Button
                  className={`blog-tabs ${
                    activeCategory === "all" ? "active-category-tab" : ""
                  }`}
                  onClick={() => {
                    setCurrentPage(1); // Reset page number when changing category
                    fetchBlogs(1);
                    setActiveCategory("all");
                    setIsOpen(false);
                  }}
                >
                  All
                </Button>
                {categoryTabs.map((item: any, index: number) => (
                  <Button
                    className={`blog-tabs ${
                      activeCategory === item.name ? "active-category-tab" : ""
                    }`}
                    onClick={() => {
                      setCurrentPage(1); // Reset page number when changing category
                      fetchSelectedBlogs(item.name, 1);
                      setActiveCategory(item.name);
                      setIsOpen(false);
                    }}
                    key={item.id + index}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
        <br />
        {activeCategory === "all" && (
          <Row>
            {loading.trendingBlogs ? (
              <></>
            ) : (
              <>
                <Col md={6}>
                  <>
                    {trendingBlogsData
                      .slice(0, 1)
                      .map((blog: any, index: number) => {
                        return (
                          <Card className="border-0" key={index + blog.title}>
                            <Link
                              className="cursor-pointer"
                              href={`/learn/blogs/${blog.slug}`}
                            >
                              <Image
                                src={imgPath(blog.image?.url)}
                                alt={blog.image?.name}
                                width={592}
                                height={410}
                                className="w-full"
                              />
                              <h3 className="text-[24px] max-[768px]:text-[22px] leading-[30px] py-[10px] text-[#298DFE] ">
                                {blog.title}
                              </h3>
                            </Link>

                            <p className="text-[#475467] text-[20px] max-[768px]:text-[18px]">
                              {TruncString(
                                blog.description[0].children[0].text
                              )}
                            </p>
                            <br />
                            <div className="flex items-baseline">
                              <div className="flex py-[5px] max-[768px]:pb-0">
                                {blog.categories?.map(
                                  (category: any, i: number) => {
                                    return (
                                      <Badge
                                        className="!bg-[#EAF4FF] !text-[#298DFE] text-[16px] m-[2px] rounded-[16px] font-[500] my-[7px]"
                                        key={i + category?.name}
                                      >
                                        {category?.name}
                                      </Badge>
                                    );
                                  }
                                )}
                              </div>
                              <p className="text-[14px] leading-[20px] ml-[5px]">
                                {new Date(blog?.publishedAt).toDateString()}
                              </p>
                            </div>
                          </Card>
                        );
                      })}
                  </>
                </Col>
                <Col md={6}>
                  {trendingBlogsData.length !== 0 && (
                    <>
                      <Image
                        src={"/trending-blogs.svg"}
                        alt={"trending blogs"}
                        width={393}
                        height={2}
                        className="w-full"
                      />
                      <>
                        {trendingBlogsData
                          .slice(1)
                          .map((blog: any, index: number) => {
                            return (
                              <>
                                <Link
                                  className="py-[30px]"
                                  key={index + blog.publishedAt}
                                  href={`/learn/blogs/${blog.slug}`}
                                >
                                  <h3 className="text-[24px] max-[768px]:text-[22px] leading-[30px]  py-[10px] font-semibold text-[#101828]">
                                    {blog.title}
                                  </h3>
                                </Link>

                                <div className="flex items-baseline">
                                  <div className="flex py-[5px] max-[768px]:pb-0">
                                    {blog.categories?.map(
                                      (category: any, i: number) => {
                                        return (
                                          <Badge
                                            className="!bg-[#EAF4FF] !text-[#298DFE] text-[16px] m-[2px] rounded-[16px] font-[500] my-[7px]"
                                            key={i + category?.name}
                                          >
                                            {category?.name}
                                          </Badge>
                                        );
                                      }
                                    )}
                                  </div>
                                  <p className="text-[14px] leading-[20px] ml-[5px]">
                                    {new Date(blog?.publishedAt).toDateString()}
                                  </p>
                                </div>
                                <br />
                              </>
                            );
                          })}
                      </>
                    </>
                  )}
                </Col>
              </>
            )}
          </Row>
        )}
        <Row>
          {loading.blogs ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <Spinner animation="border" variant="primary" />
            </div>
          ) : blogsData.length > 0 ? (
            <>
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                totalBlogs={totalBlogs}
                startBlog={startBlog}
                endBlog={endBlog}
                handlePageChange={handlePageChange}
              />
              {blogsData.map((blog: any) => (
                <Col md={6} lg={4} key={blog.id} className="py-4">
                  <BlogCard blog={blog} />
                </Col>
              ))}
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                totalBlogs={totalBlogs}
                startBlog={startBlog}
                endBlog={endBlog}
                handlePageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="py-[80px] max-[768px]:py-[40px] max-[768px]:h-[400px]">
              <h3 className="text-center text-[22px]">No Data Found</h3>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
}
