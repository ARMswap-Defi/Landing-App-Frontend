// BlogDetailClient.tsx (Client Component)
"use client";

import { useEffect } from "react";

const BlogDetailClient = () => {
  useEffect(() => {
    console.log("hello");

    // Function to handle when the user navigates away using navbar/footer (not back navigation)
    const handleRouteChange = () => {
      // Reset currentPage to 0 only when navigation happens via navbar or footer links
      console.log("Route change");
      localStorage.setItem("currentPage", "0");
    };

    // Track when the user uses the back button or forward navigation (via popstate)
    const handlePopState = (event: any) => {
      // When back button is pressed, we don't update localStorage
      console.log("back btn");

      if (event.state && event.state.idx === 0) {
        console.log("Back navigation detected, not updating localStorage");
      }
    };

    // Attach event listener to detect back/forward navigation (popstate)
    window.addEventListener("popstate", handlePopState);

    // Listen for clicks on links to detect when user navigates via navbar/footer
    const handleLinkClick = (event: any) => {
      if (event.target.tagName === "A") {
        // Check if the link is navigating (via navbar or footer), and then reset localStorage
        handleRouteChange();
      }
    };

    // Attach click listener for navigation via links
    document.addEventListener("click", handleLinkClick);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  return null; // This component doesn't render anything, it only manages side effects
};

export default BlogDetailClient;
