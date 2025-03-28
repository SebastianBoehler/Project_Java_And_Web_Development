import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard 
          title="Products" 
          description="Manage your store products" 
          link="/admin/products" 
          linkText="View Products"
        />
        
        <DashboardCard 
          title="Create Product" 
          description="Create new products with AI" 
          link="/admin/products/create" 
          linkText="Create New"
        />
      </div>
    </div>
  );
}

function DashboardCard({ 
  title, 
  description, 
  link, 
  linkText
}: { 
  title: string; 
  description: string; 
  link: string; 
  linkText: string;
}) {
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
