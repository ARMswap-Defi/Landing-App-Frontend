// "use client";
// import { useEffect, useState } from "react";
// import GlobalApi from "@/app/_utils/GlobalApi";
// import { imgPathSecure } from "@/app/components/blog-card/blogCard";

// export default function Grants() {
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);
//   const [url, setUrl] = useState("");
//   const fetchAudit = () => {
//     GlobalApi.GetAudit().then((resp) => {
//       // console.log(resp?.data?.data?.attributes);
//       setUrl(resp?.data?.data?.pdf_file?.url);
//     });
//   };
//   useEffect(() => {
//     fetchAudit();
//   }, []);

//   useEffect(() => {
//     async function fetchPdf() {
//       try {
//         const response = await fetch(imgPathSecure(url));
//         if (!response.ok) {
//           throw new Error("Failed to fetch the PDF.");
//         }
//         const blob = await response.blob();
//         const urlpath = URL.createObjectURL(blob);
//         setPdfUrl(urlpath);
//       } catch (error) {
//         console.error("Error fetching the PDF:", error);
//       }
//     }
//     fetchPdf();
//   }, [url]);

//   return pdfUrl ? (
//     <iframe src={pdfUrl} width="100%" height="600px" />
//   ) : (
//     <p>Loading PDF...</p>
//   );
// }
"use client";
import { useState, useEffect } from "react";

export default function Grants() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    // The PDF is assumed to be in the public folder, e.g., /public/pdf/audit.pdf
    const publicPdfPath = "/pdf/audit-report.pdf"; // Adjust the path as needed
    setPdfUrl(publicPdfPath);
  }, []);

  return pdfUrl ? (
    <iframe src={pdfUrl} width="100%" height="600px" />
  ) : (
    <p>Loading PDF...</p>
  );
}

