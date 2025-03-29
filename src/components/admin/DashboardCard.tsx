import Link from "next/link";

interface DashboardCardProps {
  title: string;
  description: string;
  link: string;
  linkText: string;
}

export default function DashboardCard({ 
  title, 
  description, 
  link, 
  linkText
}: DashboardCardProps) {
  return (
    <div className={`border rounded-lg p-6`}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link 
        href={link}
        className={`inline-block py-2 px-4 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300`}
      >
        {linkText}
      </Link>
    </div>
  );
}
