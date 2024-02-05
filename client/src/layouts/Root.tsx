import Header from "../components/header/Header"
import Main from "../components/main/Main"
import Footer from "../components/footer/Footer"

import style from "./Root.module.css"
import { Outlet } from "react-router-dom"

export default function Root() {


    return (
        <div className={style["root-layout"]}>
            <Header />
            <Main>
                <Outlet/>
            </Main>
            <Footer />
        </div>
    )
}