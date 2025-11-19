import { Outlet } from "react-router-dom"
import Header from "./Components/Header/Header"
import Protected from "./Protected" 
export default function LayoutProject(){
    return(
        <>
        <Header/>
       <Protected><Outlet/></Protected> 
        </>
    )
}