import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { ProductsPage } from "./components/pages/Products";
import { ExpirationsPage } from "./components/pages/Expirations";
import { NavMenu } from "./components/nav-menu";
import { Toaster } from "./components/ui/sonner";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col px-20 py-5 justify-center  w-full gap-20">
        <NavMenu /> {/* ✅ agora está dentro do Router */}
        <Routes>
          <Route path="/" element={<Navigate to="/produtos" replace />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/validades" element={<ExpirationsPage />} />
        </Routes>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
