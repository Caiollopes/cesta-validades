import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useState } from "react";
import { useTheme } from "./theme-provider";
import { Birdhouse, House, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation, useNavigate } from "react-router-dom";

export function NavMenu() {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  function isActive(path: string) {
    return location.pathname === path;
  }

  return (
    <div className="flex items-center justify-center">
      <Menubar className="w-fit">
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => navigate("/produtos")}
            className={isActive("/produtos") ? "bg-muted" : "hover:bg-muted/30"}
          >
            Produtos
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => navigate("/validades")}
            className={
              isActive("/validades") ? "bg-muted" : "hover:bg-muted/30"
            }
          >
            Validades
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="menubar" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only ">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
