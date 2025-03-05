import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { imgPath } from "../blog-card/blogCard";

interface contentProps {
  title: string;
  description: string;
  roadmapCards: any[];
  col: any;
}

const RoadmapSection: React.FC<contentProps> = ({
  title,
  description,
  roadmapCards,
  col,
}) => {
  return (
    <Container>
      {/* <AnimatedWrapper from="up" delay={0.3}> */}
        <h2 className="font-bold text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px]  max-[992px]:leading-[40px] max-[768px]:leading-[35px] text-[#101828] text-center mb-[16px]">
          {title}
        </h2>
        <p className="text-center text-[16px] max-[768px]:text-[16px] leading-[30px]">
          {description}
        </p>
      {/* </AnimatedWrapper> */}
      {/* <AnimatedWrapper from="bottom" delay={0.3}> */}
        <Row className="justify-center pt-[80px] ">
          {roadmapCards?.map((item: any, index: number) => {
            return (
              <Col
                lg={col}
                gap={2}
                md={3}
                key={index+item.title}
                className="mb=[20px] relative"
              >
                {/* <hr className="bg-[#D6E4FF]" /> */}
                <Image
                  height={48}
                  width={243}
                  src={imgPath(item.image.url)}
                  alt={item.title}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
                <br />
                <h4 className="text-[20px] font-semibold leading-[30px] pb-[15px]">
                  {item.title}
                </h4>
                <ReactMarkdown
                  className="roadmap-bullet leading-[25.6px] text-[16px] max-[768px]:text-[16px]"
                  rehypePlugins={[rehypeRaw]}
                >
                  {item.description}
                </ReactMarkdown>
                <br />
              </Col>
            );
          })}
        </Row>
      {/* </AnimatedWrapper> */}
    </Container>
  );
};

export default RoadmapSection;
