import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useTheme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation, useNavigate } from "react-router-dom";

export function FuncMenu() {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  function isActive(path: string) {
    return location.pathname === path;
  }

  return (
    <div className="flex items-center justify-start">
      <Menubar className="w-fit">
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => navigate("/app/produtos")}
            className={
              isActive("/app/produtos") ? "bg-primary" : "hover:bg-muted/30"
            }
          >
            Produtos
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => navigate("/app/validades")}
            className={
              isActive("/app/validades") ? "bg-primary" : "hover:bg-muted/30"
            }
          >
            Validades
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
