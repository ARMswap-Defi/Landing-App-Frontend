"use client";
import Image from "next/image";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type FAQ = {
  question: string;
  answer: string;
};

type FAQsProps = {
  questions: FAQ[];
};

const FAQs: React.FC<FAQsProps> = ({ questions }) => {
  const [activeKeys, setActiveKeys] = useState<string[]>(["0"]);
  const handleToggle = (key: string) => {
    if (activeKeys.includes(key)) {
      setActiveKeys(activeKeys.filter((k) => k !== key));
    } else {
      setActiveKeys([...activeKeys, key]);
    }
  };
  return (
    <>
      {/* <AnimatedWrapper from="up" delay={0.2}> */}
        <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] font-semibold text-[#000000] text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-[20px] max-[768px]:text-[18px] text-[#000000] text-center py-[10px] faq-desc">
          What people commonly ask about ARMswap and its features.
        </p>
        <br />
        <br />
        <Accordion
          className="faqs-accordion lg:w-[70%] m-auto"
          defaultActiveKey={["0"]}
          alwaysOpen
        >
          {questions?.map((faq: FAQ, index: number) => (
            <Accordion.Item
              eventKey={index.toString()}
              key={index + faq.question}
            >
              <Accordion.Header onClick={() => handleToggle(index.toString())}>
                <div className="icon-wrapper flex w-full items-center justify-between">
                  <p className="text-[20px] max-[768px]:text-[18px] font-semibold text-[#101828]">
                    {faq.question}
                  </p>
                  {activeKeys.includes(index.toString()) ? (
                    <Image
                      src={"/minus.svg"}
                      alt={"Minus icon"}
                      className="icon"
                      width={24}
                      height={26}
                    />
                  ) : (
                    <Image
                      src={"/plus.svg"}
                      alt={"Minus icon"}
                      className="icon"
                      width={24}
                      height={26}
                    />
                  )}
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <ReactMarkdown
                  className="text-[#475467] text-[20px] max-[768px]:text-[18px]"
                  rehypePlugins={[rehypeRaw]}
                >
                  {faq.answer}
                </ReactMarkdown>
                {/* <div className="text-base text-[#475467]" dangerouslySetInnerHTML={{
                        __html: faq.answer.replace(/\n/g, '<br />').replace(/\\>/g,'•'),
                        }} /> */}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      {/* </AnimatedWrapper> */}
    </>
  );
};
export default FAQs;
