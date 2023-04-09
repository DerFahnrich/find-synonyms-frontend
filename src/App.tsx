import { Outlet } from "react-router-dom";
import { Menu, Navbar } from "./components";

export const App = (): JSX.Element => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Menu />
        <Outlet />
      </main>
    </div>
  );
};
