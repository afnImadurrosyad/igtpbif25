import NavbarDash from "@/components/dashboard/dashNavbar";
import DashboardKehadiran from "@/components/dashboard/dashKehadiran";
import DashPeserta from "@/components/dashboard/dashPeserta";

export default function Page() {
  return (
    <div>
      <div className="p-4">
      <NavbarDash />
      {/* dash admin */}
      <DashboardKehadiran />
      <DashPeserta />
      </div>
    </div>
  );
}
