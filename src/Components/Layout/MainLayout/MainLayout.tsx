import { MainRoute } from "../../Route/MainRoute/MainRoute";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import "./MainLayout.css";

export function MainLayout(): JSX.Element {
    return (
        <div className="MainLayout">
            <header>
                <Header />
            </header>
            <main>
                <MainRoute />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
