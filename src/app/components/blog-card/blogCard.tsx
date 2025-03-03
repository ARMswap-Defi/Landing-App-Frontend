import Image from "next/image";
import { Badge, Card } from "react-bootstrap";
import Link from "next/link";

interface contentProps {
  title: string;
  imgUrl: string;
  description: string;
}
export const imgPath = (text: string) => {
  const x = process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL;

  return `${x}${text}`;
};
export const imgPathSecure = (text: string) => {
  const x = process.env.NEXT_PUBLIC_STRAPI_URL;
  return `${x}${text}`;
};
const BlogCard = ({ blog }: any) => {
  const TruncString = (text: string) => {
    return text.length > 80 ? text.substring(0, 100) + "..." : text;
  };
  return (
    <Card className="border-0  hover:border-primary h-full  relative p-3">
      <div className="mb-2 rounded-[6px] overflow-hidden ">
        <Link className="cursor-pointer" href={`/learn/blogs/${blog.slug}`}>
          {/* <>{imgPath(blog.attributes?.image?.data.attributes.url)}</> */}
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${blog.image?.url}`}
            className="w-full blog-img-card"
            width={384}
            height={240}
            alt="image"
          />
        </Link>
        {/* <img src={imgPath(blog.attributes?.image?.data?.attributes.url)} className="w-full" alt="" /> */}
      </div>

      <p className=" bottom-0 text-[20px] max-[768px]:text-[18px] leading-[20px] pt-[10px]">
        {new Date(blog.publishedAt).toDateString()}
      </p>

      <div className="flex py-[5px] max-[768px]:pb-0">
        {blog.categories?.map((category: any, i: number) => {
          return (
            <Badge
              className="!bg-[#EAF4FF] !text-[#298DFE] text-[16px] m-[2px] rounded-[16px] font-[500] my-[7px]"
              key={i + category?.name}
            >
              {category?.name}
            </Badge>
          );
        })}
      </div>
      <Link className="cursor-pointer" href={`/learn/blogs/${blog.slug}`}>
        <div className="flex items-start">
          <h3 className="text-[22px] font-black text-[#101828] pb-[10px]">
            {blog.title}
          </h3>
          <Image
            src={`/arrow-blog.svg`}
            className=""
            width={24}
            height={24}
            alt="image"
          />
        </div>
      </Link>
      <p className="text-base text-[#475467] text-[20px] max-[768px]:text-[18px]">
        {TruncString(blog?.description[0].children[0].text)}
      </p>
      <br className="hidden md:block" />
    </Card>
  );
};

export default BlogCard;
