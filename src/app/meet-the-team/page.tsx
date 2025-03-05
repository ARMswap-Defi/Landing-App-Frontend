import { fetchData } from "@/app/_utils/ServerApis";
import { imgPath } from "@/app/components/blog-card/blogCard";
import Banner from "@/app/components/pageBanner/banner";
import Image from "next/image";
import { Container, Spinner } from "react-bootstrap";
import { Metadata } from "next";
import Link from "next/link";
import AnimatedWrapper from "../_utils/AnimatedWrapper";

// This function fetches metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const aboutData: any = await fetchData(
    "meet-the-team-page?populate[meta_tags]=*"
  );

  const Metatag: any = aboutData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
const body = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
  },
};
async function fetchMembers() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/meet-the-teams?populate=*&pagination[limit]=50&sort=order:asc`,
      body
    );
    const response = res.json();
    // console.log("data ", response);

    return response;
  } catch (err) {
    console.error(err);
  }
}
export default async function MeetTheTeam() {
  // const meetTheTeamData: any = await fetchData(
  //   "meet-the-team-page?populate=*,banner.image,banner.buttons,faqs"
  // );
  let meetTheTeamData: any = null;
  try {
    // const data: any = await fetchData(
    //   "meet-the-team-page?populate=*,banner.image,banner.buttons,faqs"
    // );

    // strapi 5
    const data: any = await fetchData(
      "/meet-the-team-page?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*"
    );
    if (!data) {
      throw new Error("No data found");
    }
    meetTheTeamData = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3>No data found</h3>
      </div>
    );
  }
  const TeamMemebers = await fetchMembers();

  if (!meetTheTeamData || !TeamMemebers) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <>
      {meetTheTeamData?.banner && (
        <div className="wrapped-gradient-banner meet-the-team-banner">

        <Banner
            title={meetTheTeamData.banner.title}
            description={meetTheTeamData.banner.description}
            ImgURL={imgPath(meetTheTeamData?.banner?.image?.url)}
            bannerButtons={[]}
            unoptomize={false} 
            height={570} 
            width={689}        
            />
        </div>
      )}

      {TeamMemebers && (
        <section>
          <Container className="section-top-padding">
            <AnimatedWrapper from="center" delay={0.2}>
              <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] font-bold leading-[48px] text-center">
                Meet the Team Behind ARMswap
              </h2>
              <p className="text-[20px] max-[768px]:text-[18px] leading-[27px] text-center">
                We are proud to be a awesome team. We are really awesome people
                with good knowledge.
              </p>
              <br />
            </AnimatedWrapper>
            <div className="flex flex-wrap justify-center">
              {TeamMemebers?.data?.map((member: any, index: number) => {
                return (
                  <Link
                    className="xl:w-[20%] lg:w-[25%] md:w-[33%] sm:w-[50%] xs-[50%] p-[10px] team-link"
                    key={index + member?.id + member?.name}
                    href={member?.url!==null? member?.url:""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AnimatedWrapper from="center" delay={0.2}>
                      <div className="team-member">
                        <div className="team-member-image mb-[10px] relative">
                          <Image
                            src={imgPath(member?.image?.url)}
                            className="w-full"
                            alt={member?.name}
                            width={230}
                            height={230}
                          />
                        </div>
                        <h4 className="text-[20px] max-[475px]:text-[18px]  leading-[30px] font-semibold w-[230px]  max-[475px]:w-[150px] max-[600px]:text-center">
                          {member?.name}
                        </h4>
                        <p className="text-[20px] max-[768px]:text-[18px] max-[475px]:text-[16px]  w-[230px] max-[475px]:w-[150px] max-[600px]:text-center">{member?.designation}</p>
                      </div>
                    </AnimatedWrapper>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
