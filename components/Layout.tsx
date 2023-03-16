import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { State } from "../store/reducer";

export default function Layout({ children }: { children: any }) {
    const {
        preferences: { theme }
    } = useSelector((state: State) => state);

    return (
        <div data-theme={theme}>
            <Navbar />
            <main>{children}</main>
        </div>
    )
}