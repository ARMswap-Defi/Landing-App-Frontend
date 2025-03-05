"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { hyphenToTitleCase } from "@/app/_utils/hyphenToTitleCase";
import { fetchData } from "@/app/_utils/ServerApis";
import Breadcrumb from "@/app/components/breadcrum/breadcrum";
import NoDataFound from "@/app/components/no-data-found/no-data-found";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [articles, setArticles] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);

  const categoryText = hyphenToTitleCase(params.category);

  // const articles: any = await fetchData("tab-knowledgebases?populate=*");
  // const howCanYouGetInvolved: any = articles;
  const fetchCategory = () => {
    GlobalApi.GetSlectedCategory(category).then(async (resp) => {
      // console.log("data :", resp?.data?.data?.attributes?.tab_knowledgebases);
      // console.log("selected cat", resp?.data?.data[0]?.slug);
      setSelectedCategory(resp?.data?.data[0]?.slug);
    });
  };
  const fetcharticles = () => {
    GlobalApi.GetSlectedCategoryArticles(category).then(async (resp) => {
      // console.log("data :", resp?.data?.data?.attributes?.tab_knowledgebases);
      // console.log("articles", resp?.data?.data);
      setArticles(resp?.data?.data);
    });
  };
  const fetchPopularArticles = () => {
    GlobalApi.GetPopularArticles().then(async (resp) => {
      // console.log("data :", resp?.data?.data?.attributes?.tab_knowledgebases);
      // console.log("articles", resp?.data?.data);
      setPopularArticles(resp?.data?.data);
    });
  };
  useEffect(() => {
    fetchCategory();
    fetchPopularArticles();
  }, []);
  useEffect(() => {
    if (selectedCategory) fetcharticles();
  }, [selectedCategory]);
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-5xl mx-auto p-4">
        <Breadcrumb
          items={[
            { name: "HOME", href: "/knowledge-base" },
            { name: categoryText },
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-8 rounded-lg ">
            {articles?.length > 0 ? (
              <>
                {articles.map((item: any, index: number) => {
                  // const category = encodeURIComponent(item.title);
                  return (
                    <Link
                      key={item?.id}
                      href={`/knowledge-base/${category}/${item.slug}`}
                    >
                      <div className="my-4">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                          <div className="bg-white shadow-lg rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-2">
                              {item.title}
                            </h2>
                            <p className="text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </>
            ) : (
              <NoDataFound message="No article found" />
            )}
          </div>
          <div className="col-span-4 ">
            <div className="bg-[#EAF4FF] shadow-lg rounded-lg p-4 my-4">
              <h2 className="text-xl font-semibold mb-4">Popular Articles</h2>
              <ul className="space-y-4">
                {popularArticles?.length > 0 ? (
                  <>
                    {popularArticles.map((item: any, index: number) => {
                      // const category = encodeURIComponent(item.title);
                      return (
                        <Link
                          key={item?.id}
                          href={`/knowledge-base/${category}/${item.slug}`}
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
            <div className="bg-[#EAF4FF] shadow-lg rounded-lg p-4 my-4">
              <h2 className="text-xl font-semibold mb-4">Need support?</h2>
              <p className="text-gray-600">
                Can&apos;t find the answer you&apos;re looking for? We&apos;re
                here to help!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
