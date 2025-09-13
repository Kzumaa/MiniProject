import { Outlet } from "react-router-dom";
import Footer from "@/components/base/Footer";
import Sidebar from "@/components/base/Sidebar";

export default function BaseLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <main className="flex-1">
          <div className="mx-auto container-narrow px-4 py-6">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
