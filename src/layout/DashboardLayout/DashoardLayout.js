import { Outlet } from "react-router-dom";
import TabSidebar from "./TabSidebar";

function Layout() {
    return (
        <div className="bg-pink-50 font-nunito">
            <div className="flex">
                <TabSidebar />
                <main className="bg-white h-screen ml-2 w-full">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default Layout;