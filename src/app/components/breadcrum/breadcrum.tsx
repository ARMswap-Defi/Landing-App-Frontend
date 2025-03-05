// components/Breadcrumb.tsx
import Link from "next/link";

interface BreadcrumbProps {
  items: { name: string; href?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 py-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <Link href={item.href} className="text-blue-500 hover:underline">
              {item.name}
            </Link>
          ) : (
            <span className="text-gray-600">{item.name}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
