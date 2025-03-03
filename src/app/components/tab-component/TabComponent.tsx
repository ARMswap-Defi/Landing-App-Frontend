"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Tab, Row, Col, Nav, Accordion } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

// Define the expected shape of the tab data
interface TabData {
  id: string;
  heading: string;
  description: string;
}

// Props type for the TabComponent
interface TabComponentProps {
  tabsData: TabData[];
}

// Client-side component to render tabs
const TabComponent: React.FC<TabComponentProps> = ({ tabsData }) => {
  const [activeKeys, setActiveKeys] = useState<string[]>(["0"]);
  const handleToggle = (key: string) => {
    if (activeKeys.includes(key)) {
      setActiveKeys(activeKeys.filter((k) => k !== key));
    } else {
      setActiveKeys([...activeKeys, key]);
    }
  };
  return (
    <Tab.Container
      id="left-tabs-example"
      defaultActiveKey={`${tabsData[0]?.id}`}
    >
      <Row className="md:flex hidden">
        <Col md={3}>
          <Nav variant="pills" className="flex-column">
            {tabsData?.map((item) => (
              <Nav.Item
                key={item.id}
                className=" border-btn-link rounded-[8px] border cursor-pointer border-2-[#298DFE] !border-[#298DFE] mb-[24px] "
              >
                <Nav.Link className="px-[24px] py-[12px]" eventKey={item.id}>
                  {item.heading}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col md={9}>
          <Tab.Content>
            {tabsData?.map((item) => (
              <Tab.Pane
                eventKey={item.id}
                key={item.id}
                className="rounded-[12px] bg-white px-[24px] pb-[24px]"
              >
                <h3 className="font-semibold text-[#101828] text-[22px] mb-[8px]">
                  {item.heading}
                </h3>
                {/* <div
                  className="text-[#101828]"
                  dangerouslySetInnerHTML={{
                    __html: item.description.replace(/\n/g, "<br/>"),
                  }}
                  
                /> */}
                <ReactMarkdown
                  className="text-[#101828] markdown-a markdown-description governance-tabs"
                  rehypePlugins={[rehypeRaw]}
                >
                  {item.description}
                </ReactMarkdown>
                <br />
                 {(item.heading==="Community " || item.heading==="Community") && <Link
                       
                        className="border-btn-link bg-transparent hollow-button border border-[#298DFE] text-[#298DFE] px-[10px] py-[10px] max-[768px]:p-[10px] text-base font-bold rounded-lg "
                        href={'https://snapshot.box/#/s:armswap.eth '}
                      >
                        Cast your vote
                      </Link>}
                      
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row>
      <Accordion
        className="faqs-accordion lg:w-[70%] m-auto md:hidden block"
        defaultActiveKey={["0"]}
        alwaysOpen
      >
        {tabsData?.map((item, index) => (
          <Accordion.Item
            eventKey={index.toString()}
            key={index + item.heading}
          >
            <Accordion.Header onClick={() => handleToggle(index.toString())}>
              <div className="icon-wrapper flex w-full items-center justify-between">
                <p className="text-[20px] max-[768px]:text-[18px] font-semibold text-[#101828]">
                  {item.heading}
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
                className="text-[#101828] text-[20px] max-[768px]:text-[18px]"
                rehypePlugins={[rehypeRaw]}
              >
                {item.description}
              </ReactMarkdown>
              {/* <div className="text-base text-[#475467]" dangerouslySetInnerHTML={{
                        __html: faq.answer.replace(/\n/g, '<br />').replace(/\\>/g,'•'),
                        }} /> */}
                         <br />
                 {(item.heading==="Community " || item.heading==="Community") && <Link
                       
                        className="border-btn-link bg-transparent hollow-button border border-[#298DFE] text-[#298DFE] px-[10px] py-[10px] max-[768px]:p-[10px] text-base font-bold rounded-lg  mb-[20px]"
                        href={'https://snapshot.box/#/s:armswap.eth '}
                      >
                        Cast your vote
                      </Link>}
                      <br />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Tab.Container>
  );
};

export default TabComponent;
