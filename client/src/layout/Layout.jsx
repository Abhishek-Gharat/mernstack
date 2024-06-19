import Header from "../components/Header"
import { Outlet } from "react-router-dom"
import AccountNav from "../components/account/AccountNav"

export default function Layout(){
    return (
        <div className="bg-gradient-custom">
           <Header />
            <div className="py-20">
              <Outlet />
            </div>
        </div>
    )
}
