"use client";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { imgPath } from "../blog-card/blogCard";
import Link from "next/link";

const copyToClipboard = (address: any) => {
  navigator.clipboard.writeText(address);
  alert("Address copied to clipboard!");
};
const TokenAddress: React.FC<any> = ({ title, address }) => {
  return (
    <section className="py-[80px] max-[768px]:py-[40px] bg-[#1E334E]">
      <div>
        <Container>
          <Row className="m-0 items-center">
            <Col xl={3} lg={4} md={12}>
              <h3 className="text-white text-center font-open-sauce text-[22px] leading-[30px] font-bold max-[768px]:py-[10px]">
                {title}
              </h3>
            </Col>
            <Col xl={9} lg={8} md={12}>
              {address?.map((item: any, index: number) => {
                return (
                  <div key={item?.id} className="lg:flex items-center max-[992px]:text-center  max-[768px]:pt-[10px] pb-[10px]">
                    <div
                      className="inline-flex items-center  bg-[#298DFE] text-white mx-2 p-2 text-base font-bold rounded-full mr-2 !px-5"
                      style={{ minWidth: "160px",height:'50px' }}
                    >
                      <Image
                        className="mx-1"
                        alt="image"
                        width={24}
                        height={24}
                        style={{}}
                        src={imgPath(item.image.url)}
                        unoptimized={false}
                      />
                      <span className="ml-[5px]">{item.name}</span>
                    </div>
                    <div className="lg:flex items-center justify-between bg-gray-100 p-2 rounded-lg bg-transparent">
                      <button
                        onClick={() => copyToClipboard(item.address)}
                        className="lg:flex items-center text-gray-600 mr-2"
                      >
                        <span className="lg:flex text-white font-open-sauce xl:text-[22px] lg:text-[18px] text-[19px] not-italic font-bold break-all mobile-flex-colomn">
                       {item.address}
                          <Image 
                          className="mx-1 max-[768px]:m-auto"
                          alt="image"
                          width={24}
                          height={24}
                          style={{}}
                          src="/images/svgs/copy.svg"
                          unoptimized={false}
                        />
                        </span>
                       
                      </button>
                    </div>
                  </div>
                );
              })}
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default TokenAddress;
