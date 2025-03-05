"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.scss";
import { Container } from "react-bootstrap";
import Image from "next/image";
import GlobalApi from "@/app/_utils/GlobalApi";
import { div } from "framer-motion/client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const [whitepaperUrl, setWhitepaperUrl] = useState("");
  const [auditUrl, setAuditUrl] = useState("");

  // const fetchWhitePaper = () => {
  //   GlobalApi.GetWhitepaper().then((resp) => {
  //     // console.log(resp?.data?.data?.attributes);
  //     setWhitepaperUrl(resp?.data?.data?.pdf_file?.url);
  //   });
  // };
  // const fetchAudit = () => {
  //   GlobalApi.GetAudit().then((resp) => {
  //     // console.log(resp?.data?.data?.attributes);
  //     setAuditUrl(resp?.data?.data?.pdf_file?.url);
  //   });
  // };
  // useEffect(() => {
  //   fetchWhitePaper();
  //   fetchAudit();
  // }, []);
  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Tokenomics",
      path: "/armsp-token",
    },

    {
      name: "Security",
      path: "",
      dropdown: [
        { name: "ARMswap Security", path: "/armswap-security" },
        // {
        //   name: "Audits",
        //   path: `${process.env.NEXT_PUBLIC_STRAPI_URL}${auditUrl}`,
        //   isPDF: true,
        // },
        {
          name: "Audits",
          path: "/pdf/audit-report.pdf", // Static path to the PDF in the public folder
          isPDF: true,
        },
        { name: "Transparency", path: "/armswap-transparency" },
        { name: "Bug Bounty Program", path: "/bug-bounty-program" },
        { name: "Restricted Countries", path: "/restricted-countries" },
      ],
    },
    {
      name: "Learn",
      path: "",
      dropdown: [
        { name: "Buy ARMSP Coins", path: "/how-to-buy-armsp-coin" },
        { name: "Blogs", path: "/learn/blogs" },
        { name: "Grants & Rewards", path: "/grants" },
        { name: "Knowledgebase", path: "https://docs.armswap.com/" },
        { name: "Governance", path: "/governance" },
        // {
        //   name: "Whitepaper",
        //   path: `${process.env.NEXT_PUBLIC_STRAPI_URL}${whitepaperUrl}`,
        //   isPDF: true,
        // },
        {
          name: "Whitepaper",
          path: "/pdf/whitepaper.pdf", // Static path to the PDF in the public folder
          isPDF: true,
        },
        { name: "Pools", path: "/armswap-pools" },
        { name: "Bridge", path: "/bridge-your-token" },
      ],
    },
    {
      name: "About",
      path: "",
      dropdown: [
        { name: "About Us", path: "/about-us" },
        { name: "Meet the Team", path: "/meet-the-team" },
        { name: "Roadmap", path: "/roadmap" },
        { name: "Contact Us", path: "/contact-us" },
        { name: "ARMswap Mobile App", path: "/armswap-mobile-app" },
        { name: "Partner", path: "/partner-with-armswap" },
        { name: "Affiliated Projects", path: "/armswap-affiliated-projects" },
        { name: "Our Coverage", path: "/our-coverage" },
        { name: "Our Features", path: "/armswap-features" },
        { name: "Our Vision", path: "/our-vision" },
      ],
    },
  ];

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`bg-white p-[20px]  max-[768px]:p-[10px]  ${
        styles.navbar
      } fixed w-full z-[9999] top-0 ${isSticky ? "shadow-md" : ""}`}
    >
      <Container className=" mx-auto flex justify-between items-center max-[768px]:px-0">
        <div className="text-primary text-lg font-bold">
          <Link href="/">
            <Image
              src={"/armswap_landscape_logo.svg"}
              alt="image"
              width={122}
              height={40}
            />
          </Link>
        </div>
        <div className="hidden md:flex items-center">
        <Link
            className="border-btn-link bg-transparent hollow-button border border-[#298DFE] text-[#298DFE] p-2 text-base font-bold rounded-lg ml-[20px]"
            href={"https://token.armswap.com"}
            target="_blank"
          >
            Buy ARMSP
          </Link>
          {navItems.map((item: any) => (
            <div
              key={item.path}
              className={`relative ${styles.nav_btn} group ml-[15px]`}
            >
              <Link
                href={item.path}
                className={`!flex items-center ${
                  pathname === item.path
                    ? styles["navbar-link-active"]
                    : styles["navbar-link"]
                } hover:text-primary`}
              >
                <span>{item.name}</span>
                {item.dropdown && (
                  <svg
                    className={`w-4 h-4 ml-1 ${styles.svg_icon}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                )}
              </Link>

              {item.dropdown && (
                <div className="absolute  group-hover:block hidden">
                  <div
                    className={`relative ${styles.dropdown} shadow-md z-10 group-hover:block hidden`}
                    style={{ width: "max-content" }}
                  >
                    {item.dropdown.map((dropdownItem: any) => (
                      <Link
                      onClick={() => setIsOpen(!isOpen)}
                        key={dropdownItem.path}
                        href={dropdownItem.path}
                        target={dropdownItem.isPDF ? "_blank" : "_self"}
                        rel={
                          dropdownItem.isPDF ? "noopener noreferrer" : undefined
                        }
                        className={`block p-2 hover:bg-white rounded-md`}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            className="border-btn-link bg-transparent hollow-button border border-[#298DFE] text-[#298DFE] p-2 text-base font-bold rounded-lg ml-[20px]"
            href={"https://app.armswap.com/#/router "}
            target="_blank"
          >
            Launch App
          </Link>
        </div>
       
        <div className="md:hidden flex">
        <Link
              className="border-btn-link bg-transparent hollow-button border border-[#298DFE] text-[#298DFE] p-[5px] text-base max-[425px]:text-[14px] font-bold rounded-lg  max-[768px]:mr-[5px]"
               href={"https://token.armswap.com"}
            target="_blank"
            >
              Buy ARMSP
            </Link>
        <Link
              className="border-btn-link bg-transparent hollow-button border border-[#298DFE] text-[#298DFE] p-[5px] text-base font-bold rounded-lg max-[425px]:text-[14px] max-[768px]:mr-[5px]"
               href={"https://app.armswap.com/#/router "}
            target="_blank"
            >
              Launch App
            </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles["navbar-link"]}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </Container>
      {isOpen && (
        <>
          <div className={`md:hidden pb-[80px] relative  ${styles.dropdown}`} style={{top:'10px',left:'0'}}>
            {navItems.map((item) => (
              <div key={item.path} className="relative">
                <Link
                  href={item.path}
                  className={`!flex items-center block p-2 ${
                    pathname === item.path
                      ? styles["navbar-link-active"]
                      : styles["navbar-link"]
                  } hover:text-primary`}
                  onClick={() => {
                    toggleDropdown(item.name)
                    if(item.path!==''){
                      setIsOpen(!isOpen)
                    }
                  }}
                >
                  <span>{item.name}</span>
                  {item.dropdown && (
                    <svg
                      className={`w-4 h-4 ml-2 ${styles.svg_icon}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  )}
                </Link>
                {item.dropdown && (
                  <div
                    className={`bg-white shadow-md rounded-md p-2 z-10 ${
                      activeDropdown === item.name ? "block" : "hidden"
                    }`}
                  >
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        onClick={() => setIsOpen(!isOpen)}
                        key={dropdownItem.path}
                        href={dropdownItem.path}
                        className={`block p-2 hover:bg-gray-100 rounded-md`}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
                   
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
