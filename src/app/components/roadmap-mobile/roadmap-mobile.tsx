
import {  Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";


interface contentProps {
  title: string;
  description: string;
  roadmapCards: any[];
  col: any;
}

const RoadmapSectionMobile: React.FC<contentProps> = ({
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
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <ul className="timeline">
                {roadmapCards?.map((item: any, index: number) => {
                  return (
                    <li
                      key={index}
                      className={
                        index < roadmapCards.length - 1
                          ? "phase"
                          : "final_phase"
                      }
                    >
                      <h4 className="text-[20px] font-semibold leading-[30px] pb-[15px]">
                        {item.title}
                      </h4>
                      <ReactMarkdown
                        className="roadmap-bullet leading-[25.6px]"
                        rehypePlugins={[rehypeRaw]}
                      >
                        {item.description}
                      </ReactMarkdown>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      {/* </AnimatedWrapper> */}
    </Container>
  );
};

export default RoadmapSectionMobile;
