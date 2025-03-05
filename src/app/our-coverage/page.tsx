import { imgPath } from "@/app/components/blog-card/blogCard";
import Banner from "@/app/components/pageBanner/banner";
import Coin from "../components/coin/coin";
import { Spinner } from "react-bootstrap";
import { fetchData } from "../_utils/ServerApis";
import { Metadata } from "next";
import { BannerData } from "../types/types";

export async function generateMetadata(): Promise<Metadata> {
  const aboutData: any = await fetchData(
    "/coverage-page?populate[meta_tags]=*"
  );

  const Metatag: any = aboutData?.meta_tags || {};

  return {
    title: Metatag.title || "Default Title",
    description: Metatag.description || "Default description",
    // Add other metadata fields as needed
  };
}
export default async function Pool() {
  // const [bannerData, setBannerData] = useState<BannerData>();
  // const [coins, setCoins] = useState<any>();
  // const [metatag, setMetatag] = useState<any>();
  // const [loading, setLoading] = useState<boolean>(true); // Loading state
  // const [error, setError] = useState<boolean>(false);

  // const fetchPoolData = () => {
  //   setLoading(true); // Start loading when the API call starts
  //   setError(false);
  //   GlobalApi.GetCoverageData()
  //     .then((resp) => {
  //       // console.log("APi", resp);
  //       const attributes = resp?.data?.data;

  //       if (!attributes) {
  //         setError(true); // If no data, set error to true
  //       } else {
  //         setBannerData(resp?.data?.data?.banner);
  //         setCoins(resp?.data?.data?.coins);
  //         setMetatag(resp?.data?.data?.meta_tags);
  //       }

  //       setLoading(false); // Stop loading after the API call finishes
  //     })
  //     .catch(() => {
  //       setLoading(false); // Stop loading and handle error case
  //       setError(true);
  //     });
  // };
  // useEffect(() => {
  //   fetchPoolData();
  // }, []);
  let OurCoverageData: any = null;
  try {
    const data: any = await fetchData(
      "/coverage-page?populate[banner][populate][image]=*&populate[banner][populate][buttons]=*&populate[coins][populate][coin_image]=*&populate[meta_tags]=*"
    );
    if (!data) {
      throw new Error("No data found");
    }
    OurCoverageData = data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center py-5">
        <h3>No data found</h3>
      </div>
    );
  }
  if (!OurCoverageData) {
    // If no data is loaded, render a spinner or skeleton
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const bannerData: BannerData = OurCoverageData.banner;
  const coins = OurCoverageData.coins;
  return (
    <>
      {bannerData && (
        <div className="wrapped-gradient-banner">
          <Banner
            title={bannerData.title}
            description={bannerData.description}
            ImgURL={imgPath(bannerData.image.url)}
            bannerButtons={[]}
            unoptomize={false}
            height={bannerData.image.height}
            width={bannerData.image.width}
          />
        </div>
      )}

      {coins && (
        <div className="py-[40px]">
          <Coin
            title={"ARMswap Supported Chains"}
            description={coins?.description}
            xl={3}
            md={4}
            lg={3}
            sm={6}
            xs={6}
            coinsData={coins}
            height={80}
            width={80}
            boderWidth={0}
            align="center"
            cardsBackground={"#EFF6FD"}
            headingColor="#101727"
          />
        </div>
      )}
    </>
  );
}
