import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { State } from "../store/reducer";
import React, { useEffect } from 'react';

export default function Layout({ children }: { children: any }) {
    const {
        preferences: { theme }
    } = useSelector((state: State) => state);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme || "");
    }, [theme]);

    return (
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    )
}