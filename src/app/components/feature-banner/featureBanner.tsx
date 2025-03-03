import AnimatedWrapper from "@/app/_utils/AnimatedWrapper";
import { Col, Container, Row } from "react-bootstrap";

interface contentProps {
  roadmapData: any[];
}
const FeatureBanner: React.FC<contentProps> = ({ roadmapData }) => {
  // console.log("Token roadmap", roadmapData);
  return (
    <>
    

      <section className="bg-[#E3F0FF] py-[30px] max-[768px]:py-[0px]">
        <Container className="max-[768px]:m-[0px]">
          <Row>
            {roadmapData?.length > 0
              ? roadmapData?.map((item: any, index: number) => {
                  return (
                    <Col
                      key={item?.id}
                      lg={3}
                      md={6}
                      className="py-[20px] border-l border-l-[#298DFE]"
                    >
                      {/* <AnimatedWrapper from="center"  delay={0.2}> */}

                      <p className="lg:text-[45px] text-[26px]">
                        {item?.alignLeft ? (
                          <span className="text-[#298DFE]">
                            {item?.symbol}
                          </span>
                        ) : null}
                        {item?.value}
                        {!item?.alignLeft ? (
                          <span className="text-[#298DFE]">
                            {item?.symbol}
                          </span>
                        ) : null}
                      </p>
                      <br className="hidden md:block" />
                      <p className="text-[#298DFE] text-[20px] max-[768px]:text-[18px] font-bold">
                        {item?.title}
                      </p>
                      {/* </AnimatedWrapper> */}
                    </Col>
                  );
                })
              : null}
          </Row>
        </Container>
      </section>
    </>
  );
};
export default FeatureBanner;
