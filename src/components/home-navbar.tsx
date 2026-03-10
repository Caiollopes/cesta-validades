import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Computer, Leaf, Moon, ShoppingBasket, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./theme-provider";

export function HomeNavbar() {
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  return (
    <nav className="sticky top-5 z-50 flex items-center justify-between rounded-2xl border border-border/50 bg-background/80 px-5 py-3 shadow-sm backdrop-blur-md">
      {/* Logo */}
      <button
        className="flex flex-row items-center gap-2 p-1 transition-colors hover:text-green-600 dark:hover:text-green-400 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <ShoppingBasket className="size-7 text-green-600 dark:text-green-400" />
        <span className="font-semibold text-base tracking-tight hidden sm:inline">
          Cesta Validades
        </span>
      </button>

      {/* Ações */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-border/50 hover:border-green-400 hover:text-green-600 dark:hover:text-green-400"
            >
              <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[130px]">
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className="flex items-center gap-2"
            >
              <Sun className="h-4 w-4" />
              Claro
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className="flex items-center gap-2"
            >
              <Moon className="h-4 w-4" />
              Escuro
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className="flex items-center gap-2"
            >
              <Computer className="h-4 w-4" />
              Sistema
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          size="sm"
          className="rounded-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600"
          onClick={() => navigate("/app/produtos")}
        >
          Teste agora
        </Button>
      </div>
    </nav>
  );
}
