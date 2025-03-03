
import {  Container } from "react-bootstrap";
import Link from "next/link";

interface props {
  title: string;
  description: string;
  bannerButtons: any;
  target: string;
}

const BlueCard: React.FC<props> = ({
  title,
  description,
  bannerButtons,
  target,
}) => {
  // console.log("buttons", bannerButtons);
  return (
    <section className="py-[40px]">
      {/* <AnimatedWrapper from="center" delay={0.2}> */}
        <Container>
          <div className="bg-[#EAF4FF] md:rounded-[100px] md:py-[40px] max-[768px]:p-[20px] gap-[24px] max-[768px]:p-[20px] max-[768px]:pb-[30px]">
            <div className="md:w-[70%] m-auto text-center">
              <h2 className="pt-[10px] pb-[20px] text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] text-[#298DFE] font-bold text-center max-[768px]:pb-[10px] ">
                {title}
              </h2>
              <p className="py-[10px] text-[16px] max-[768px]:text-[16px] text-[#101828] " 
                dangerouslySetInnerHTML={{
                  __html: `${description}`,
                }}
              />
             
            </div>
            <br />
            <div className="text-center">
              {bannerButtons?.length !== 0 &&
                bannerButtons?.map((button: any, index: number) => {
                  return (
                    <Link
                      key={button?.id}
                      className="bg-[#298DFE] text-white px-[24px] py-[12px] text-base font-bold rounded-[1000px] mr-2"
                      href={button.link}
                      target={target}
                    >
                      {button.title}
                    </Link>
                  );
                })}
            </div>
          </div>
        </Container>
      {/* </AnimatedWrapper> */}
    </section>
  );
};

export default BlueCard;
