// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";

// interface CarouselProps {
//   coins: any[];
//   visibleCoins: number;
// }

// const Carousel: React.FC<CarouselProps> = ({ coins, visibleCoins }) => {
//   const [currentCoins, setCurrentCoins] = useState<any[]>([]);
//   const trackRef = useRef<HTMLDivElement>(null);
//   const [isAnimating, setIsAnimating] = useState(false);
  
//   const totalCoins = coins.length;

//   useEffect(() => {
//     // Initialize the visible coins plus one extra coin for smooth transitions
//     setCurrentCoins(coins.slice(0, visibleCoins + 1));
//   }, [coins, visibleCoins]);

//   const handleNext = () => {
//     if (isAnimating) return;

//     setIsAnimating(true);

//     // Animate the slide to the left
//     trackRef.current!.style.transition = "transform 0.5s ease-in-out";
//     trackRef.current!.style.transform = `translateX(-100px)`; // Adjust to coin width

//     setTimeout(() => {
//       setCurrentCoins((prevCoins) => {
//         const nextIndex = (coins.indexOf(prevCoins[1]) + visibleCoins) % totalCoins; 
//         const newCoin = coins[nextIndex];

//         // Remove the first coin and add a new coin at the end
//         const updatedCoins = [...prevCoins.slice(1), newCoin];

//         return updatedCoins;
//       });

//       // Reset transform to avoid jumpy behavior
//       trackRef.current!.style.transition = "none";
//       trackRef.current!.style.transform = `translateX(0)`;

//       setIsAnimating(false);
//     }, 500); // Match CSS transition duration
//   };

//   useEffect(() => {
//     const interval = setInterval(handleNext, 3000); // Auto-rotate every 3 seconds
//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [coins]);

//   return (
//     <div className="carousel-container overflow-hidden relative">
//       <div className="carousel-track flex" ref={trackRef}>
//         {currentCoins.map((coin, index) => (
//           <div
//             key={index}
//             className="coin-icon flex-shrink-0"
//             style={{ width: "100px" }}
//           >
//             <Image
//               src={`${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${coin.coin_image[0].url}`}
//               alt={coin.name}
//               height={72}
//               width={72}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;



