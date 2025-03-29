import Link from "next/link";

//Layout for /admin routes

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/admin" className="text-xl font-bold">
            Sebastian&apos;s Admin
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/admin" className="hover:text-blue-300">
                  Admin
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-300">
                  View Store
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>Admin Panel - Sebastian&apos;s Store</p>
      </footer>
    </div>
  );
}
