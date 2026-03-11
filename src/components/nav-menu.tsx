import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useLocation, useNavigate } from "react-router-dom";

export function FuncMenu() {
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
              isActive("/app/produtos")
                ? "bg-primary text-background"
                : "hover:bg-muted/30"
            }
          >
            Produtos
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => navigate("/app/validades")}
            className={
              isActive("/app/validades")
                ? "bg-primary text-background"
                : "hover:bg-muted/30"
            }
          >
            Validades
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
