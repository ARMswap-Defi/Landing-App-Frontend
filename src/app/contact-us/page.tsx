"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "@/app/_utils/ServerApis";
import BlogCard, { imgPath } from "@/app/components/blog-card/blogCard";
import rehypeRaw from "rehype-raw";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import SubscribeForm from "../components/subscribe-form/subscribe-form";
import Link from "next/link";
import styles from "../components/pageBanner/banner.module.scss";
import AnimatedWrapper from "../_utils/AnimatedWrapper";
import IconSlider from "../components/IconSlider/icon-slider";
import { Helmet } from "react-helmet";
// import dynamic from 'next/dynamic';
// // import IconSlider from "../components/IconSlider/icon-slider";

// const IconSlider = dynamic(() => import('../components/IconSlider/icon-slider'), { ssr: false });

// // This function fetches metadata dynamically
// export async function generateMetadata(): Promise<Metadata> {
//   const aboutData: any = await fetchData("contact?populate=meta_tags");

//   const Metatag: any = aboutData?.meta_tags || {};

//   return {
//     title: Metatag.title || "Default Title",
//     description: Metatag.description || "Default description",
//     // Add other metadata fields as needed
//   };
// }
export default function Contact() {
  const [contactData, setContactData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [blogsData, setBlogsData] = useState<any[]>([]);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  useEffect(() => {
    async function fetchContactData() {
      setLoading(true);
      try {
        // strapi 4 data fetching
        // const data: any = await fetchData(
        //   "/home?populate=*,earn_oppertunity.border_buttons,earn_oppertunity.image,banner,banner.buttons,our_affiliated_projects.roadmap_cards.image,roadmap.roadmap_cards.image,armswap_empowering.image,armswap_empowering.border_buttons,trade_nytime.border_buttons,trade_nytime.image,how_it_works.cards.image,multi_chain_bridge.cards.image,join_our_community.cards.link_buttons,cross_chain_content.image,cross_chain_content.border_buttons,cross_chain_content.primary_buttons,multi_party_content.image,multi_party_content.border_buttons,multi_party_content.primary_buttons,faqs,armsp_token_roadmaps,coin_heading_description,coins.coin_image,meta_tags"
        // );

        //strapi 5 data fetching
        const data: any = await fetchData(
          "/contact?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[our_affiliated_projects][populate][roadmap_cards][populate][image]=*"
        );

        // if (!data || !data?.attributes) {
        //   throw new Error("No data found");
        // }
        if (!data) {
          throw new Error("No data found");
        } else {
          setContactData(data);
          setLoading(false);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error?.message);
      } finally {
        setLoading(false);
      }
      const dataBlog: any = await fetchData(
        "/blogs?populate=*&pagination[limit]=3&sort[0]=createdAt:desc"
      );
      if (!dataBlog) {
        throw new Error("No data found");
      } else {
        // console.log("Blog data :", blogsData);
        setBlogsData(dataBlog);
      }
      const socialLinksData: any = await fetchData(
        "arm-swap-footer?populate[socialmedias][populate][image]=*&populate[footer_links][populate][sub_category]=*"
      );
      if (!socialLinksData) {
        throw new Error("No data found");
      } else {
        setSocialLinks(socialLinksData.socialmedias);
      }
    }

    fetchContactData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!contactData) {
    return (
      <div className="text-center py-5">
        <h3>No data found</h3>
      </div>
    );
  }
  // let contactData: any = null;
  // try {
  //   const data: any = await fetchData(
  //     "/contact?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[our_affiliated_projects][populate][roadmap_cards][populate][image]=*"
  //   );
  //   if (!data) {
  //     throw new Error("No data found");
  //   }
  //   contactData = data;
  // } catch (error: any) {
  //   console.error("Error fetching data:", error.message);
  //   return (
  //     <div className="text-center py-5">
  //       <h3>No data found</h3>
  //     </div>
  //   );
  // }
  // if (!contactData) {
  //   // If no data is loaded, render a spinner or skeleton
  //   return (
  //     <div className="text-center py-5">
  //       <Spinner animation="border" variant="primary" role="status">
  //         <span className="sr-only">Loading...</span>
  //       </Spinner>
  //     </div>
  //   );
  // }
  const OurAffiliatedProjects: any = contactData?.our_affiliated_projects;
  // const blogsData: any = await fetchData(
  //   "/blogs?populate=*&pagination[limit]=3&sort[0]=createdAt:desc"
  // );
  // const socialLinksData: any = await fetchData(
  //   "arm-swap-footer?populate[socialmedias][populate][image]=*&populate[footer_links][populate][sub_category]=*"
  // );
  // const socialLinks = socialLinksData.socialmedias;
  const htmlContent = `<div class="sib-form" style="text-align: center;
    background-color: transparent;                                 ">
<div id="sib-form-container" class="sib-form-container">
<div id="error-message" class="sib-form-message-panel" style="font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#661d1d; background-color:#ffeded; border-radius:3px; border-color:#ff4949;max-width:540px;">
 <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
   <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
     <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
   </svg>
   <span class="sib-form-message-panel__inner-text">
                     Your subscription could not be saved. Please try again.
                 </span>
 </div>
</div>
<div></div>
<div id="success-message" class="sib-form-message-panel" style="font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#085229; background-color:#e7faf0; border-radius:3px; border-color:#13ce66;max-width:540px;">
 <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
   <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
     <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
   </svg>
   <span class="sib-form-message-panel__inner-text">
                     Your subscription has been successful.
                 </span>
 </div>
</div>
<div></div>
<div id="sib-container" class="sib-container--large sib-container--horizontal" style="text-align:center; background-color:rgba(255,255,255,1); max-width:540px; border-radius:3px; border-width:0px; border-color:#C0CCD9; border-style:solid; direction:ltr">
<div><h3 class="join-community">Join the ARMSP Vibrant Community</h3> 
<p class="join-exclusive">Join Now For Exclusive Early Access</p>
</div><div>
<form id="sib-form" method="POST" action="https://845d4f05.sibforms.com/serve/MUIFAL7bAgW_F8h25SFqvQmF6BYA3Lm2c70RkyPkAed40zxp9vUd56EX49BJjDcJsSmvR4s0RZAxxbuHtKxjPJmy-CJOugN0gOLcPwJsZRHGZyWb_u-h72yphDSzRq9b1YBzKoIdSGedaSEMoimlEeIhlJTwoivfQ1L7mW2wQn5qjbwRqPjIazwsDX8JqIc_8jOEZcWdsBE7k9AI" data-type="subscription">
   <div style="padding: 8px 0;">
     <div class="sib-input sib-form-block">
       <div class="form__entry entry_block">
         <div class="form__label-row form__label-row--horizontal">

           <div class="entry__field">
             <input class="input email-input" type="text" id="EMAIL" name="EMAIL" autocomplete="off" placeholder="EMAIL" data-required="true" required />
           </div>
         </div>

         <label class="entry__error entry__error--primary" style="font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#661d1d; background-color:#ffeded; border-radius:3px; border-color:#ff4949;">
         </label>
       </div>
     </div>
   </div>
   <div style="padding: 8px 0;">
     <div class="sib-form-block" style="text-align: left">
       <button class="sib-form-block__button sib-form-block__button-with-loader" style="font-size:16px; text-align:left; font-weight:700; color:#FFFFFF; background-color:#298dfe; border-radius:20px; border-width:0px;" form="sib-form" type="submit">
         <svg class="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512">
           <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
         </svg>
         Subscribe
       </button>
     </div>
   </div>

   <input type="text" name="email_address_check" value="" class="input--hidden">
   <input type="hidden" name="locale" value="en">
 </form>
<div><span class="join-community-desc">We care about your data in our privacy policy.</span> </div>

 </div>

</div>
</div>
</div>
   `;
  // console.log(blogsData);
  return (
    <>
      <Helmet>
        <title>Get Expert Help & Answers | ARMswap Contact Us</title>
        <meta
          name="description"
          content="Need assistance or have questions about cross-chain bridging and swapping? Contact ARMswap for expert help and quick answers to all your queries."
        />
      </Helmet>
      <>
        {contactData?.banner && (
          <div className={`${styles.banner}`}>
            <AnimatedWrapper from="up" delay={0.2}>
              <div className="wrapped-gradient-banner anchor-primary">
                <Row>
                  <Col md={6} className={styles["banner-text-col"]}>
                    <Container className={`${styles["content"]} max-[767px]:text-center`}>
                      {contactData.banner.title && (
                        <h1 className="text-[#101828] lg:text-[64px]  sm:text-[30px] max-[768px]:pt-[35px] max-[1280px]:pt-[20px] text-[30px] font-bold mb-2">
                          {contactData.banner.title}
                        </h1>
                      )}
                      <ReactMarkdown
                        className="text-[20px] max-[768px]:text-[18px]  text-[#101828] mb-4 font-medium md:leading-[2rem]"
                        rehypePlugins={[rehypeRaw]}
                      >
                        {contactData.banner.description}
                      </ReactMarkdown>
                    </Container>
                  </Col>
                  <Col
                    md={6}
                    className={`${styles["banner-img-col"]} gradient-img-banner`}
                  >
                    {contactData.banner.image.url && (
                      <Image
                        alt="image"
                        width={400}
                        height={408}
                        style={{ height: 408, width: 400 }}
                        src={imgPath(contactData.banner.image.url)}
                        unoptimized={false}
                      />
                    )}
                  </Col>
                </Row>
              </div>
            </AnimatedWrapper>
          </div>
        )}
        <section className="upper-footer py-[48px]">
          <Container>
            <Card className="p-4 border border-[#EAECF0] rounded-[16px]">
              <Row>
                <Col md={5}>
                  <h3 className="text-[22px] font-semibold text-[#101828]">
                    Have More Questions?
                  </h3>
                  <br />
                  <p className="text-[#475467] text-[16px] max-[768px]:text-[16px]">
                    If you need help or have any questions, contact us on one of
                    our social channels.
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
                  <h3 className="text-[22px] font-semibold text-[#101828]">
                    Contact Support
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
                          style={{ width: "fit-content" }}
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
                  <>
                    <div>
                      <h3 className=" text-left text-[22px] font-semibold text-[#101828]">
                        Contact us
                      </h3>
                    </div>
                    <iframe className="helpdesk-iframe"
                      src="https://help.armswap.com/custom-ticket"
                      style={{ border: "none", width: "100%", height: "540px" }}
                    ></iframe>
                    <h3 className="text-[#101828] text-[30px] max-[768px]:text-[22px]  font-bold leading-[38px]">
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
                  </>
                </Col>
              </Row>
            </Card>
          </Container>
        </section>

        {blogsData && (
          <section className="py-[40px]">
            <Container>
              <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px]  max-[992px]:leading-[40px] max-[768px]:leading-[35px] text-center font-bold py-[20px]">
                Our Featured Articles
              </h2>
              <Row>
                {blogsData?.map((blog: any, index: number) => {
                  return (
                    <Col md={6} lg={4} key={blog.id} className="pb-4">
                      <BlogCard blog={blog} />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </section>
        )}

        {OurAffiliatedProjects && (
          // <section className="py-[40px]">
          //   <Container>
          //     <div className="bg-light-grey">
          //       <h2 className="text-[32px] text-center font-bold ">
          //         {OurAffiliatedProjects.heading}
          //       </h2>
          //       <div className="bg-projects-upper">
          //         <div className="bg-projects flex flex-wrap justify-around items-center">
          //           <>
          //             {OurAffiliatedProjects.roadmap_cards.map(
          //               (item: any, index: number) => {
          //                 return (
          //                   <div key={item?.id}>
          //                     <Image
          //                       key={index}
          //                       className="px-[10px]"
          //                       src={imgPath(item?.image.url)}
          //                       alt={item.title}
          //                       width={
          //                         item?.image.width > 300
          //                           ? 170
          //                           : item?.image.width < 100
          //                           ? 100
          //                           : item?.image.width
          //                       }
          //                       height={
          //                         item?.image.height > 300
          //                           ? 170
          //                           : item?.image.height
          //                       }
          //                     />
          //                   </div>
          //                 );
          //               }
          //             )}
          //           </>
          //         </div>
          //         <br />
          //         <br />
          //         <Link
          //           className="primary-btn-link w-fit bg-[#298DFE] text-white px-[24px] py-[12px] text-base text-center font-bold rounded-lg w-[140px] px-[24px] py-[12px]"
          //           href="/armswap-affiliated-projects"
          //         >
          //           Learn more
          //           <span className="arrow-content ml-2 inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
          //             →
          //           </span>
          //         </Link>
          //       </div>
          //     </div>
          //   </Container>
          // </section>
          <section className="py-[40px]">
            <AnimatedWrapper from="center" delay={0.2}>
              <Container>
                <div
                  className="bg-light-grey text-center py-[40px]"
                  style={{ paddingBottom: "40px" }}
                >
                  <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] font-semibold text-[#000000] text-center ">
                    {OurAffiliatedProjects.heading}
                  </h2>

                  <IconSlider icons={OurAffiliatedProjects.roadmap_cards} />
                  {/* <>
                    
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
                     </>  */}

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
              </Container>
            </AnimatedWrapper>
          </section>
        )}
      </>
    </>
  );
}
