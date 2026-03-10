import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { HomePage } from "./components/pages/Home";
import { DashboardPage } from "./components/pages/Dashboard";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col px-20 py-5 justify-center w-full ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/app/*" element={<DashboardPage />} />
        </Routes>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
