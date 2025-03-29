import DashboardCard from "@/components/admin/DashboardCard";

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
