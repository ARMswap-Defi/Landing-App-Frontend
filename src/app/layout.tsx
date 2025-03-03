"use client";

import "@fontsource/open-sauce-sans";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/footer";
import Script from "next/script";
import CookieConsent from "./components/cookies-consent/cookies-consent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Loader from "./components/Loader/Loader";
// Import your Loader component

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Detect current route
  const [loading, setLoading] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const getBasePath = (path: string) => {
    // Match base path '/learn/blogs' regardless of the dynamic slug
    return path.split("/").slice(0, 3).join("/"); // /learn/blogs
  };
  useEffect(() => {
    const currentBasePath = getBasePath(pathname);
    const prevBasePath = prevPathname ? getBasePath(prevPathname) : null;
    if (currentBasePath === "/learn/blogs" && prevBasePath !== "/learn/blogs") {
      // If we are going to /learn/blogs from another route, reset currentPage
      localStorage.setItem("currentPage", "1");
    } else if (prevBasePath !== "/learn/blogs") {
      localStorage.setItem("currentPage", "1");
    }
    if (prevPathname !== pathname) {
      // Start loading when the route changes
      setLoading(true);
      const timeout = setTimeout(() => {
        // Simulate loading delay for smoother transitions (optional)
        setLoading(false);
        setPrevPathname(pathname); // Update previous pathname
      }, 300); // Adjust this timeout as needed

      return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }
  }, [pathname, prevPathname]);

  const canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}${pathname}`;

  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="atth82BGXL35HVTOKPlaP-PW6VMjNvhM4yDtcdTCx60"
        />
        <link
          rel="stylesheet"
          href="https://sibforms.com/forms/end-form/build/sib-styles.css"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'}); var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:''; j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl; f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-MZQR33GM');`,
          }}
        />
      </head>
      <body>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ARMswap",
              alternateName: "ARM swap",
              url: "https://armswap.com/",
              logo: "https://armswap.com/armswap_landscape_logo.svg",
              sameAs: [
                "https://www.linkedin.com/company/armswap",
                "https://www.youtube.com/@ARMSwap",
                "https://www.instagram.com/armswap/",
                "https://twitter.com/armswapofficial",
                "https://www.facebook.com/profile.php?id=61561694560938",
              ],
            }),
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MZQR33GM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <CookieConsent />
        <Navbar />
        {loading && <Loader />} {/* Show the loader conditionally */}
        <main
          className="mt-[80px] max-[768px]:mt-[62px]"
          style={{ overflow: "hidden" }}
        >
          {children}
        </main>
        <Footer />
        <script
          defer
          src="https://sibforms.com/forms/end-form/build/main.js"
        ></script>
        <script
          defer
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
          integrity="sha384-KJ3o2DKtIkvYIKbYzw4s6ar9uTEBr31XxhHY26r1DskswCq7Lh+wrMiDkWvWyqO8"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
