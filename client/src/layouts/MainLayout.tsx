import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function MainLayout(){
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default MainLayout;