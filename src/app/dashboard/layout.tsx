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

      <div className="flex-1 flex flex-col pt-5">
        <DashboardHeader />

        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}
