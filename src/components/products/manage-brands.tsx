import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Tag, Pencil, Trash2, Check, X, Plus } from "lucide-react";
import { toast } from "sonner";

interface ManageBrandsProps {
  brands: string[];
  onAddBrand: (name: string) => void;
  onRenameBrand: (oldName: string, newName: string) => void;
  onDeleteBrand: (name: string) => void;
}

export function ManageBrands({
  brands,
  onAddBrand,
  onRenameBrand,
  onDeleteBrand,
}: ManageBrandsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newBrand, setNewBrand] = useState("");
  const [editingBrand, setEditingBrand] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  function handleAdd() {
    const trimmed = newBrand.trim();
    if (!trimmed) return;
    if (brands.some((b) => b.toLowerCase() === trimmed.toLowerCase())) {
      toast.error("Marca já existe.");
      return;
    }
    onAddBrand(trimmed);
    setNewBrand("");
    toast.success("Marca adicionada!");
  }

  function startEdit(brand: string) {
    setEditingBrand(brand);
    setEditValue(brand);
  }

  function confirmEdit() {
    const trimmed = editValue.trim();
    if (!trimmed || !editingBrand) return;
    if (
      trimmed.toLowerCase() !== editingBrand.toLowerCase() &&
      brands.some((b) => b.toLowerCase() === trimmed.toLowerCase())
    ) {
      toast.error("Já existe uma marca com esse nome.");
      return;
    }
    onRenameBrand(editingBrand, trimmed);
    setEditingBrand(null);
    toast.success("Marca renomeada!");
  }

  function cancelEdit() {
    setEditingBrand(null);
  }

  function handleDelete(brand: string) {
    onDeleteBrand(brand);
    toast.success("Marca excluída!");
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Tag />
          Marcas
        </Button>
      </DialogTrigger>
      <DialogContent className="w-100">
        <DialogHeader>
          <DialogTitle>Gerenciar marcas</DialogTitle>
          <DialogDescription>
            Adicione, renomeie ou exclua marcas de produtos.
          </DialogDescription>
        </DialogHeader>

        {/* Adicionar nova marca */}
        <div className="flex gap-2">
          <Input
            placeholder="Nova marca..."
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
            className="flex-1"
          />
          <Button type="button" onClick={handleAdd}>
            <Plus size={16} />
            Adicionar
          </Button>
        </div>

        {/* Lista de marcas */}
        <div className="flex flex-col gap-2 overflow-y-auto pr-1 max-h-100">
          {brands.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhuma marca cadastrada.
            </p>
          )}
          {brands.map((brand) =>
            editingBrand === brand ? (
              <div key={brand} className="flex items-center gap-2">
                <Input
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") confirmEdit();
                    if (e.key === "Escape") cancelEdit();
                  }}
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={confirmEdit}
                >
                  <Check size={16} />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={cancelEdit}
                >
                  <X size={16} />
                </Button>
              </div>
            ) : (
              <div
                key={brand}
                className="flex shrink-0 items-center justify-between rounded-md border px-3 py-2 text-sm"
              >
                <span>{brand}</span>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => startEdit(brand)}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(brand)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ),
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
