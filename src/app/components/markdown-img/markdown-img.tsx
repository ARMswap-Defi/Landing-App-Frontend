import React from "react";

interface CustomImageProps {
  src: string;
  alt: string;
}
const Markdown_Img: React.FC<CustomImageProps> = ({ src, alt }) => {
  // Replace 'httpss' with 'https' in the image URL
  const oldBaseUrl: any = process.env.NEXT_PUBLIC_STRAPI_URL_PREPROD;
  const newBaseUrl: any = process.env.NEXT_PUBLIC_STRAPI_URL;

  // Replace the old base URL with the new base URL
  let fixedSrc = src.replace(oldBaseUrl, newBaseUrl);

  // Convert all remaining 'https' to 'http'
  // fixedSrc = fixedSrc.replace(/^https:\/\//i, "http://");

  return <img src={fixedSrc} alt={alt} />;
};

export default Markdown_Img;
