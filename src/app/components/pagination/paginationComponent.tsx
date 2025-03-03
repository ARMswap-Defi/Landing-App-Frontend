import { Pagination } from "react-bootstrap";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
  startBlog: number;
  endBlog: number;
  handlePageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalBlogs,
  startBlog,
  endBlog,
  handlePageChange,
}) => {
  return (
    <div className="md:flex items-center justify-end">
      <p className="text-center text-[#475467] text-[16px] pr-[10px]">
        Showing {startBlog}-{endBlog} of {totalBlogs} blogs
      </p>
      {totalPages > 1 && (
        <Pagination className="justify-content-center max-[768px]:mt-[10px]">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </div>
  );
};

export default PaginationComponent;