import Header from "./Header";
import { Outlet } from "react-router-dom"

function Layout() {
    return ( 
        <div className="bg-pink-50 font-nunito">
            <Header />
            <div className="flex">
                <main className="bg-white h-screen ml-2 w-full">
                    <Outlet />
                </main>

            </div>
           
        </div>
     );
}

export default Layout;