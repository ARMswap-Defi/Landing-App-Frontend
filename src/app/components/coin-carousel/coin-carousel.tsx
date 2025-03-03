// import { Container } from "react-bootstrap";
// import Carousel from "./carousel";
// import Link from "next/link";
// import AnimatedWrapper from "@/app/_utils/AnimatedWrapper";
// export type Coin = {
//   src: string;
//   alt: string;
// };
// interface coinCarousel {
//   title: string;
//   description: string;
//   bannerButtons: any[];
//   coins: any;
// }
// const CoinCarousel: React.FC<coinCarousel> = ({
//   title,
//   description,
//   bannerButtons,
//   coins,
// }) => {
//   return (
//     <section className="py-[40px] text-center">
//       <Container>
//       {/* <AnimatedWrapper from="left"  delay={0.2}> */}

//         <h2 className="text-[40px] max-[768px]:text-[26px] max-[992px]:text-[32px] leading-[50px] max-[992px]:leading-[40px] max-[768px]:leading-[35px] text-[#1E344E] font-bold ">
//           {title}
//         </h2>
//         <br />
//         <p className="text-[20px] max-[768px]:text-[18px] text-[#475565] ">{description}</p>
//         <br />
//         {/* </AnimatedWrapper> */}
//         {/* <AnimatedWrapper from="right"  delay={0.2}> */}
//         {coins.length!==0 && <Carousel coins={coins} visibleCoins={12} />}
//         {bannerButtons?.length !== 0 &&
//           bannerButtons?.map((button: any, index: number) => {
//             return (
//               <Link
//                 key={button?.id}
//                 className="bg-[#298DFE] text-white px-[24px] py-[12px] text-base font-bold rounded-lg mr-2"
//                 href={button.link}
//               >
//                 {button.title}
//               </Link>
//             );
//           })}

//         {/* </AnimatedWrapper> */}
      
//       </Container>
//     </section>
//   );
// };

// export default CoinCarousel;
