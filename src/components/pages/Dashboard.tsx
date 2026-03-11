import { Route, Routes } from "react-router-dom";
import { HomeNavbar } from "../home-navbar";
import { FuncMenu } from "../nav-menu";
import { ProductsPage } from "./Products";
import { ExpirationsPage } from "./Expirations";

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <HomeNavbar />
      <FuncMenu />
      <Routes>
        <Route path="produtos" element={<ProductsPage />} />
        <Route path="validades" element={<ExpirationsPage />} />
      </Routes>
    </div>
  );
}
