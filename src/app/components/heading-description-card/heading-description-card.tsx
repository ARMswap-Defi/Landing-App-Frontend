
import Image from "next/image";
import { Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { imgPath } from "../blog-card/blogCard";
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
  cardsData: any | string[];
  cardsBackground: string;
  boderWidth: number;
  headingColor: string;
  cardTitleClr: string;
  cardParagraphClr: string;
}
const HeadingDescriptionCard: React.FC<contentProps> = ({
  title,
  cardsData,
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
  cardTitleClr = "000000",
  cardParagraphClr = "#000000",
}) => {
  return (
    <>
      <Container className="justify-center">
        {/* <AnimatedWrapper from="left" delay={0.2}> */}
          {(title !== "" || title !== null) && (
            <>
              <h2
                className={`text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] font-bold text-center mb-[10px]`}
                style={{ color: headingColor }}
              >
                {title}
              </h2>{" "}
            </>
          )}
          {(description !== "" || description !== null) && (
            <p
              className="text-[16px] text-center py-[10px] lg:px-[130px]"
              style={{ color: "#000000" }}
            >
              {description}
            </p>
          )}
          <br className="hidden md:block" />
        {/* </AnimatedWrapper> */}
        {/* <AnimatedWrapper from="right" delay={0.2}> */}
          <Row className="justify-center">
            {cardsData?.map((item: any, index: number) => {
              return (
                <Col
                  lg={lg}
                  xl={xl}
                  sm={sm}
                  xs={xs}
                  md={md}
                  key={index}
                  className="col-pb"
                >
                  <Card
                    className={`card-works h-full bg-[${cardsBackground}] border-${boderWidth} flex flex-col text-${align}`}
                  >
                    <div className="h-full flex flex-col max-[768px]:text-center justify-between px-[28px] md:py-[36px] max-[768px]:py-[20px]">
                      <div>
                        {item.image && item.image.data !== null && (
                          <>
                            <Image
                              src={imgPath(item?.image?.url)}
                              style={
                                align === "center" ? { margin: "auto" } : {}
                              }
                              width={width}
                              height={height}
                              alt="image"
                              className="max-[768px]:m-auto"
                            />
                            <br />
                          </>
                        )}
                        {item.title && (
                          <h3
                            className="card-title text-[22px] font-semibold  leading-[30.8px]"
                            style={{ color: cardTitleClr }}
                          >
                            {item.title}
                          </h3>
                        )}
                        {item.description && (
                          <p
                            className="text-[16px] max-[768px]:text-[16px] leading-[24px] "
                            style={{ color: cardParagraphClr }}
                            dangerouslySetInnerHTML={{
                              __html: `${item.description}`,
                            }}
                           />
                           
                        )}
                      </div>
                      <div>
                        {item.link_buttons && (
                          <>
                            {item.primary_style_btn === true ? (
                              <>
                                <br />
                                <Link
                                  className="primary-btn-link bg-[#298DFE] text-white text-base text-center font-bold rounded-lg w-[140px] px-[24px] py-[12px] max-[992px]:p-[10px]"
                                  href={item.link_buttons.link}
                                >
                                  {item.link_buttons.title}
                                  <span className="arrow-content ml-2 inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                                    →
                                  </span>
                                </Link>
                              </>
                            ) : (
                              <>
                                <br />
                                <Link
                                  className="bg-[transparent] text-[#298DFE]  text-base text-center font-bold rounded-lg w-[140px]  arrow_anchor pr-[24px] py-[12px]  max-[992px]:p-[10px]"
                                  href={item.link_buttons.link}
                                >
                                  {item.link_buttons.title}
                                </Link>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        {/* </AnimatedWrapper> */}
      </Container>
    </>
  );
};
export default HeadingDescriptionCard;
