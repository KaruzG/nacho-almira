import AdminSidebar from "../../components/admin/layout/AdminSidebar";
import AdminFooter from "../../components/admin/layout/AdminFooter";
import Providers from "../Providers";

export const metadata = {
  title: "Admin — NACHO ALMIRA",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="flex min-h-screen bg-primary">
        <AdminSidebar />
        <div className="flex flex-col flex-1 ml-[200px]">
          <main className="flex-1 p-8 md:p-12">{children}</main>
          <AdminFooter />
        </div>
      </div>
    </Providers>
  );
}
