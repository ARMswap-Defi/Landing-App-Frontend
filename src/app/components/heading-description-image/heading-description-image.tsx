import Image from "next/image";
import { Container } from "react-bootstrap";
import { imgPath } from "../blog-card/blogCard";
interface contentProps {
  title: string;
  description: string;
  //   md: number;
  //   xl: number;
  //   lg: number;
  //   sm: number;
  //   xs: number;
  //   height: number;
  //   width: number;
  //   align: string;
  imagesData: string;
  //   boderWidth: number;
  headingColor: string;
}
const HeadingDescriptionImage: React.FC<contentProps> = ({
  title,
  imagesData,
  //   md,
  //   lg,
  //   sm,
  //   xl,
  //   xs,
  description,
  //   height,
  //   width,
  //   align,
  //   boderWidth,
  headingColor,
}) => {
  return (
    <>
      <Container className="justify-center">
        {/* <AnimatedWrapper from="left" delay={0.2}> */}
          <div className="lg:w-[60%] mx-auto ">
            {(title !== "" || title !== null) && (
              <>
                <h2
                  className={`text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] text-center !text-[${headingColor}] font-bold`}
                >
                  {title}
                </h2>{" "}
                <br />
              </>
            )}
            {(description !== "" || description !== null) && (
              <p
                className="leading-[30px] text-center text-[20px] max-[768px]:text-[18px]"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {description}
              </p>
            )}
          </div>
        {/* </AnimatedWrapper> */}
        {imagesData ? (
          // <AnimatedWrapper from="right" delay={0.2}>
            <Image
              className="mx-auto my-5"
              src={imgPath(imagesData)}
              alt="ARMSP Fair Launch"
              width={1234}
              height={403}
            />
          // </AnimatedWrapper>
        ) : null}
      </Container>
    </>
  );
};
export default HeadingDescriptionImage;
