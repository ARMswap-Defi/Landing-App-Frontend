import React from "react";
import { Container } from "react-bootstrap";

interface footer {
  quickLinks: any;
}

const FooterLinks: React.FC<footer> = ({ quickLinks }) => {
  return (
    <Container className="py-[40px]">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {quickLinks?.map((item: any, index: any) => (
          <div key={index}>
            <h3 className="pb-[10px] text-gray-600 font-sauce text-[20px] font-bold leading-[140%] tracking-tightest">
              {item.category}
            </h3>
            <ul>
              {item.sub_category.map((subItem: any, subIndex: any) => (
                <li
                  key={subIndex}
                  className="leading-[25.2px] pb-[5px] hover:text-[#298efc] transition-all duration-200 "
                >
                  <a
                    target={index === 3 ? "_blank" : "_self"}
                    href={subItem.link}
                  >
                    {subItem.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FooterLinks;
