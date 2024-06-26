import Header from "./header";
import { Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <div className="flex flex-col min-h-screen  mx-auto p-3">
        <Header/>
        <Outlet/>
        </div>
    )
}