import Link from "next/link";
import Navbar from "./Navbar";
import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <div style={{ textAlign: "center", marginTop: "auto", }}>
                <p style={{ color: "var(--sub-color)", fontFamily: 'lexend', fontWeight: 'normal' }}>
                    Designed and built by <Link href={"https://github.com/Rohith-JN"} style={{ textDecoration: "underline", color: "var(--sub-color)" }}>Rohith JN</Link>
                </p>
            </div>
        </div>
    )
}

export default Layout