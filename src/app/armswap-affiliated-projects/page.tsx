import { fetchData } from "@/app/_utils/ServerApis";
import { imgPath } from "@/app/components/blog-card/blogCard";
import HeadingDescriptionCard from "@/app/components/heading-description-card/heading-description-card";
import Banner from "@/app/components/pageBanner/banner";
import { Metadata } from "next";
import { Spinner } from "react-bootstrap";

// This function fetches metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const aboutData: any = await fetchData(
    "affiliated-project?populate[meta_tag]=*"
  );

  const Metatag: any = aboutData?.meta_tag || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function OurAffiliatedProjects() {
  // const affiliatedProjectsData: any = await fetchData(
  //   "/affiliated-project?populate=*,banner.image,banner.buttons,affiliated_projects.cards.image,affiliated_projects.cards.link_buttons.title"
  // );
  let affiliatedProjectsData: any = null;
  try {
    const data: any = await fetchData(
      "affiliated-project?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[affiliated_projects][populate][cards][populate][image]=*&populate[affiliated_projects][populate][cards][populate][link_buttons]=*"
    );
    if (!data) {
      throw new Error("No data found");
    }
    affiliatedProjectsData = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3 className="text-[22px]">No data found</h3>
      </div>
    );
  }
  if (!affiliatedProjectsData) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const affiliatedProjects: any = affiliatedProjectsData.affiliated_projects;

  return (
    <>
      <>
        {affiliatedProjectsData?.banner && (
          <div className="wrapped-gradient-banner affiliated-project-banner">
            <Banner
              title={affiliatedProjectsData.banner.title}
              description={affiliatedProjectsData.banner.description}
              ImgURL={imgPath(affiliatedProjectsData.banner.image.url)}
              bannerButtons={[]}
              unoptomize={false}
              height={affiliatedProjectsData.banner.image.height}
              width={affiliatedProjectsData.banner.image.width}
            />
          </div>
        )}

        {affiliatedProjects && (
          <section className="bg-[#FCFCFD] py-[40px]  card-img-bg">
            <HeadingDescriptionCard
              title={affiliatedProjects?.title}
              description={affiliatedProjects?.description}
              xl={4}
              md={6}
              lg={4}
              sm={12}
              xs={12}
              cardsData={affiliatedProjects?.cards}
              height={80}
              width={120}
              boderWidth={0}
              align="start"
              cardsBackground={"#fff"}
              headingColor="#101727"
              cardTitleClr={""}
              cardParagraphClr={""}
            />
          </section>
        )}
      </>
    </>
  );
}
