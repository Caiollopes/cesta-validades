import { PackagePlus, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "../ui/field";
import { BaseInput } from "../base-input";
import { DateCalendar } from "../date-calendar";
import { useState, useEffect } from "react";
import type { Product } from "./../../components/products/table/product-data";
import { toast } from "sonner";

interface ExpirationEntry {
  dateExp: Date | undefined;
  productQuant: string;
}

interface ExpirationDetailProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEditProduct: (product: Product) => void;
}

function buildEntries(product: Product): ExpirationEntry[] {
  if (product.expirations && product.expirations.length > 0) {
    return product.expirations.map((e) => ({
      dateExp: e.dateExp ? new Date(e.dateExp) : undefined,
      productQuant: e.productQuant != null ? String(e.productQuant) : "",
    }));
  }
  return [
    {
      dateExp: product.dateExp ? new Date(product.dateExp) : undefined,
      productQuant:
        product.productQuant != null ? String(product.productQuant) : "",
    },
  ];
}

export function ExpirationDetail({
  product,
  isOpen,
  onOpenChange,
  onEditProduct,
}: ExpirationDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [entries, setEntries] = useState<ExpirationEntry[]>([
    { dateExp: undefined, productQuant: "" },
  ]);

  useEffect(() => {
    if (product) {
      setEntries(buildEntries(product));
      setIsEditing(false);
    }
  }, [product, isOpen]);

  function updateEntry(
    index: number,
    field: keyof ExpirationEntry,
    value: Date | undefined | string,
  ) {
    setEntries((prev) =>
      prev.map((entry, i) =>
        i === index ? { ...entry, [field]: value } : entry,
      ),
    );
  }

  function addEntry() {
    setEntries((prev) => [...prev, { dateExp: undefined, productQuant: "" }]);
  }

  function removeEntry(index: number) {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product?.id) return;

    const expirations = entries.map((e) => ({
      dateExp: e.dateExp ? e.dateExp.getTime() : 0,
      productQuant: Number(e.productQuant) || 0,
    }));

    // dateExp = menor data (para ordenação e cor)
    const validDates = expirations.map((e) => e.dateExp).filter((d) => d > 0);
    const minDateExp = validDates.length > 0 ? Math.min(...validDates) : 0;

    onEditProduct({
      ...product,
      dateExp: minDateExp,
      expirations,
    });

    setIsEditing(false);
    onOpenChange(false);
    toast.success("Validade atualizada com sucesso!");
  };

  const handleCancel = () => {
    if (isEditing && product) {
      setEntries(buildEntries(product));
      setIsEditing(false);
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="w-100">
          <DialogHeader>
            <DialogTitle>{product?.name ?? "Produto"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Edite as validades e quantidades do produto."
                : "Visualize as validades e quantidades do produto."}
            </DialogDescription>

            <div className="my-3 flex flex-col gap-3">
              {entries.map((entry, index) => (
                <div
                  key={index}
                  className="flex flex-row items-end gap-2 rounded-md border p-3"
                >
                  {/* Data de validade */}
                  <Field className="flex-1">
                    <FieldLabel>Data de validade</FieldLabel>
                    <DateCalendar
                      value={entry.dateExp}
                      onDateChange={(date) =>
                        updateEntry(index, "dateExp", date)
                      }
                      disabled={!isEditing}
                    />
                  </Field>

                  {/* Quantidade */}
                  <Field className="flex-1">
                    <FieldLabel>Quantidade</FieldLabel>
                    <BaseInput
                      autoComplete="off"
                      placeholder="0"
                      value={entry.productQuant}
                      onChange={(e) =>
                        updateEntry(index, "productQuant", e.target.value)
                      }
                      disabled={!isEditing}
                    >
                      <PackagePlus />
                    </BaseInput>
                  </Field>

                  {/* Remover entrada */}
                  {isEditing && entries.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive mb-0.5"
                      onClick={() => removeEntry(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              ))}

              {/* Adicionar nova entrada */}
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={addEntry}
                >
                  <Plus size={16} />
                  Adicionar validade
                </Button>
              )}
            </div>
          </DialogHeader>

          <DialogFooter>
            {isEditing ? (
              <>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button type="submit" onClick={handleSave}>
                  Salvar
                </Button>
              </>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Fechar
                </Button>
                <Button type="button" onClick={() => setIsEditing(true)}>
                  <Pencil />
                  Editar
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
