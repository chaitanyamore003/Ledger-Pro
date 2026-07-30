import DashBoardNav from "../components/dashBoard/DashBoardNav";
import DashBoardSidebar from "../components/dashBoard/DashBoardSidebar";
import useSidebar from "../hooks/useSideBar";
import { Outlet } from "react-router-dom";

function DashBoard() {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f6f7fb] text-neutral-900 dark:bg-[#050505] dark:text-white">
      <DashBoardSidebar />

      <div
        className={`min-h-screen transition-[padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          collapsed ? "lg:pl-20" : "lg:pl-72"
        }`}
      >
        <DashBoardNav />

        <main className="mx-auto w-full max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="dashboard-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashBoard;
