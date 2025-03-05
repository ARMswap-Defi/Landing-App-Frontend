import Image from "next/image";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { title } from "process";
import { cardImageType } from "@/app/types/types";
import { imgPath } from "../blog-card/blogCard";
import AnimatedWrapper from "@/app/_utils/AnimatedWrapper";
interface contentProps {
  title: string;
  description: string;
  md: number;
  xl: number;
  lg: number;
  sm: number;
  xs: number;
  height: number;
  width: number;
  align: string;
  coinsData: any | string[];
  cardsBackground: string;
  boderWidth: number;
  headingColor: string;
}
const Coin: React.FC<contentProps> = ({
  title,
  coinsData,
  md,
  lg,
  sm,
  xl,
  xs,
  description,
  height,
  width,
  align,
  cardsBackground,
  boderWidth,
  headingColor,
}) => {
  // console.log(
  //   "Coin data",
  //   coinsData[0]?.attributes?.coin_image.data[0].attributes.url
  // );
  return (
    <>
      <Container className="justify-center">
        <AnimatedWrapper from="center" delay={0.2}>
          {(title !== "" || title !== null) && (
            <>
              <h2
                className={`text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px]  font-bold text-center !text-[${headingColor}]`}
              >
                {title}
              </h2>{" "}
              <br />
            </>
          )}
          {(description !== "" || description !== null) && (
            <p className="text-[20px] max-[768px]:text-[18px] text-center py-[10px]">{description}</p>
          )}
        </AnimatedWrapper>

        <Row className="justify-center">
          {coinsData?.map((item: any, index: number) => {
            return (
              <Col
                lg={lg}
                xl={xl}
                sm={sm}
                xs={xs}
                md={md}
                key={index}
                className="col-pb coin-div"
              >
                <AnimatedWrapper  from="center" delay={0.2}>
                  <Card
                    className={`card-works h-full  bg-[${cardsBackground}] border-${boderWidth} flex flex-col text-${align}`}
                  >
                    <div className="h-full flex flex-col justify-between md:px-[28px] py-[36px] coin-image-div">
                      <div>
                        {item?.coin_image[0]?.url && (
                          <>
                            <Image
                              src={imgPath(item?.coin_image[0]?.url)}
                              style={
                                align === "center" ? { margin: "auto" } : {}
                              }
                              width={width}
                              height={height}
                              alt="image"
                            />
                            <br />
                          </>
                        )}
                        {item?.coin_abrivation && (
                          <h3 className="text-[#298DFE] text-center font-bold text-[32px] max-[768px]:text-[22px] max-[768px]:pt-[10px] leading-[39.36px]">
                            {item?.coin_abrivation}
                          </h3>
                        )}
                        {item?.coin_name && (
                          <p className="text-[#1E344E] text-center font-semiboldtext-[20px] text-[20px] max-[768px]:text-[18px] leading-[28.8px] custom-font-2">
                            {item?.coin_name}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </AnimatedWrapper>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
export default Coin;
