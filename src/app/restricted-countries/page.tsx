import { imgPath } from "@/app/components/blog-card/blogCard";
import Banner from "../components/pageBanner/banner";
import { Container, Row, Spinner } from "react-bootstrap";
import { Metadata } from "next";
import { fetchData } from "@/app/_utils/ServerApis";

export async function generateMetadata(): Promise<Metadata> {
  const aboutData: any = await fetchData(
    "restrict-country?populate[meta_tags]=*"
  );

  const Metatag: any = aboutData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function Grants() {

  let restrictedCountryData: any = null;
  let restrictedCountryList: any = null;

  let isLoading = true;
  try {

    const data: any = await fetchData(
      "restrict-country?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[meta_tags]=*"
    );
    if (!data) {
      throw new Error("No data found");
    }
    restrictedCountryData = data;
    const dataList: any = await fetchData(
      "restricted-countries?pagination[limit]=100"
    );
    if (!dataList) {
      throw new Error("No data found");
    }
    restrictedCountryList = dataList;
    isLoading = false;
  } catch (error: any) {
    isLoading = false;
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3>No data found</h3>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (!restrictedCountryData) {
    return (
      <div className="text-center py-5">
        <h3>No data found or error occurred</h3>
      </div>
    );
  }

  return (
    <>
      {" "}
      <>
        {restrictedCountryData?.banner ? (
          <div className="wrapped-gradient-banner">
            <Banner
              title={restrictedCountryData?.banner.title}
              description={restrictedCountryData?.banner.description}
              ImgURL={imgPath(restrictedCountryData?.banner.image.url)}
              bannerButtons={restrictedCountryData?.banner.buttons}
              unoptomize={false}
              height={restrictedCountryData?.banner.image.height}
              width={restrictedCountryData?.banner.image.width}
            />
          </div>
        ) : null}
        {restrictedCountryList ? (
          <section>
            <Container>
              <Row className="red-cross-bullets py-[40px]">
                {/* <h2 className="text-2xl font-bold mb-4">Countries</h2> */}
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 list-disc ml-[10px]">
                  {restrictedCountryList.map((country: any, index: any) => (
                    <li key={index} className="mb-2 text-gray-700">
                      {country?.name}
                    </li>
                  ))}
                </ul>
              </Row>
            </Container>
          </section>
        ) : null}
      </>
    </>
  );
}
