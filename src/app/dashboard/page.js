import NavbarDash from "@/components/dashboard/dashNavbar";

export default function Page() {
  return (
    <div>
      <NavbarDash />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard Page</h1>
        <p>Welcome to the dashboard!</p>
      </div>
    </div>
  );
}
