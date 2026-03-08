import Sidebar from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10 space-y-6">
        <DashboardHeader />

        {children}
      </div>
    </div>
  );
}
