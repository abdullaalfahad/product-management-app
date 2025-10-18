import { Navbar } from "@/components/dashboard-layout/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-6 pt-10">
        {children}
      </main>
    </div>
  );
}
