
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import { ColImageProps } from "@/app/types/types";



const LeftColImage: React.FC<ColImageProps> = ({
  // title,
  // imgUrl,
  // description,
  // borderButtons,
  // primaryButtons,
  title = "",
  imgUrl = "",
  description = "",
  borderButtons = [],
  primaryButtons = [],
}) => {
  return (
    <Container>
      {/* <AnimatedWrapper from="left" delay={0.3}> */}
        <Row className="col-image-row">
          <Col
            md={6}
            className=" gradient-img my-auto order-1 order-md-0 lg:pr-[5rem]"
          >
            <Image src={imgUrl} alt="image" height={540} width={616} />
          </Col>
          <Col md={6} className="flex items-center order-0 order-md-1">
            <div style={{ height: "fit=content" }}>
              <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] max-[767px]:text-center font-bold  mb-[24px]">
                {title}
              </h2>
              {/* <p  dangerouslySetInnerHTML={{
                        __html:description,
                        }}></p> */}
              <ReactMarkdown
                className="text-[20px] max-[768px]:text-[18px] leading-[27px] max-[768px]:leading-[24px]  markdown-description mb-[24px]"
                rehypePlugins={[rehypeRaw]}
              >
                {description}
              </ReactMarkdown>

              {borderButtons?.length > 0 && (
                <div className="flex  max-[767px]:items-center max-[767px]:justify-evenly max-[767px]:mb-[35px]">
                  {borderButtons?.map((button: any, index: number) => {
                    return (
                      <Link
                        key={button?.id}
                        className="border-btn-link bg-transparent hollow-button border border-[#298DFE] text-[#298DFE] px-[12px] py-[12px] max-[768px]:p-[10px] text-base font-bold rounded-lg  md:mr-[20px]"
                        href={button.link}
                      >
                        {button.title}
                      </Link>
                    );
                  })}
                </div>
              )}
              {primaryButtons?.length !== 0 && (
                <div className="flex  max-[767px]:items-center max-[767px]:justify-evenly max-[767px]:mb-[35px]">
                  {primaryButtons?.map((button: any, index: number) => {
                    return (
                      <Link
                        key={button?.id}
                        className="primary-btn-link bg-[#298DFE]  border border-[#298DFE] text-[#ffffff] px-[12px] py-[12px] max-[768px]:p-[10px] text-base font-bold rounded-lg md:mr-1"
                        href={button.link}
                      >
                        {button.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </Col>
        </Row>
      {/* </AnimatedWrapper> */}
    </Container>
  );
};

export default LeftColImage;
