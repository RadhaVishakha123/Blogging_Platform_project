import { Outlet } from "react-router-dom"
import Header from "./Components/Header/Header"
export default function LayoutProject(){
    return(
        <>
        <Header/>
        <Outlet/>
        </>
    )
}