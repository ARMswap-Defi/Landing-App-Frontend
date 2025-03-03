import React from "react";

interface NoDataFoundProps {
  message?: string; // Optional prop to customize the message
}

const NoDataFound: React.FC<NoDataFoundProps> = ({
  message = "No Data Found",
}) => {
  return (
    <div className="w-full h-full bg-[#F9FAFB] flex items-center justify-center rounded-lg">
      <p className="text-[25px]">{message}</p>
    </div>
  );
};

export default NoDataFound;
