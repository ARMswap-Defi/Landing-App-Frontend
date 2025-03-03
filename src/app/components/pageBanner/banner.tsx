import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./banner.module.scss";
import Link from "next/link";

interface BannerProps {
  title: string;
  description: string;
  ImgURL: string;
  unoptomize: boolean;
  bannerButtons: any;
  height: number;
  width: number;
}

const Banner: React.FC<BannerProps> = ({
  title,
  description,
  ImgURL,
  unoptomize,
  bannerButtons,
  height,
  width,
}) => {
  return (
    <div className={`${styles.banner}`}>
      {/* <AnimatedWrapper from="up" delay={0.2}> */}
        <Row>
          <Col md={6} className={styles["banner-text-col"]}>
            <Container
              className={`${styles["content"]} max-[767px]:text-center`}
            >
              {title && (
                <h1 className="lg:text-[64px] text-[#101828] text-[30px] max-[768px]:pt-[35px]   max-[1280px]:pt-[20px] font-bold mb-2">
                  {title}
                </h1>
              )}
              <p
                style={{ whiteSpace: "pre-wrap" }}
                className="text-[20px] max-[768px]:text-[18px]  text-[#101828] mb-4 font-medium md:leading-[2rem]"
              >
                {description}
              </p>

              {bannerButtons.length !== 0 && (
                <div className="flex gap-4 pb-[15px] max-[768px]:items-center max-[768px]:justify-center">
                  {bannerButtons.map((button: any, index: number) => {
                    return (
                      <Link
                        key={button?.id}
                        className="primary-btn-link bg-[#298DFE] text-white p-[12px] max-[768px]:p-[10px] text-base font-bold rounded-lg mr-2"
                        href={button.link}
                      >
                        {button.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </Container>
          </Col>
          <Col
            md={6}
            className={`${styles["banner-img-col"]} gradient-img-banner`}
          >
            {ImgURL && (
              <Image
                alt="image"
                width={height}
                height={width}
                style={{ height: height, width: width }}
                src={ImgURL}
                unoptimized={unoptomize}
              />
            )}
          </Col>
        </Row>
      {/* </AnimatedWrapper> */}
    </div>
  );
};

export default Banner;
