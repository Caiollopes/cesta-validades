import {
  ChartBarIncreasing,
  PackagePlus,
  Pencil,
  ScanBarcode,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldSet, FieldGroup, Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { BaseInput } from "../base-input";
import { DateCalendar } from "../date-calendar";
import { useState, useEffect } from "react";
import type { Product } from "./table/product-data";
import { toast } from "sonner";

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export function ProductDetail({
  product,
  isOpen,
  onOpenChange,
  onEditProduct,
  onDeleteProduct,
}: ProductDetailProps) {
  // Controla se os campos estao habilitados para edicao
  const [isEditing, setIsEditing] = useState(false);

  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [codBar, setCodBar] = useState("");
  const [ncm, setNcm] = useState("");
  const [costValue, setCostValue] = useState("");
  const [dateExp, setDateExp] = useState<Date | undefined>();
  const [productQuant, setProductQuant] = useState("");

  // Preenche os campos quando o produto muda
  useEffect(() => {
    if (product) {
      setProductName(product.name || "");
      setBrand(product.brand || "");
      setCodBar(product.codBar != null ? String(product.codBar) : "");
      setNcm(product.ncm != null ? String(product.ncm) : "");
      setCostValue(
        product.costValue != null
          ? product.costValue.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })
          : "",
      );
      setDateExp(product.dateExp ? new Date(product.dateExp) : undefined);
      setProductQuant(
        product.productQuant != null ? String(product.productQuant) : "",
      );
      setIsEditing(false);
    }
  }, [product, isOpen]);

  // Salva as alteracoes do produto editado
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product?.id) return;

    const formatValue = costValue.replace(/\./g, "").replace(",", ".");

    onEditProduct({
      id: product.id,
      name: productName,
      brand: brand || "-",
      codBar: Number(codBar) || 0,
      ncm: Number(ncm) || 0,
      costValue: parseFloat(formatValue) || 0,
      dateExp: dateExp ? dateExp.getTime() : 0,
      productQuant: Number(productQuant) || 0,
    });

    setIsEditing(false);
    onOpenChange(false);
    toast.success("Produto atualizado com sucesso!");
  };

  // Exclui o produto
  const handleDelete = () => {
    if (!product?.id) return;

    onDeleteProduct(product.id);
    onOpenChange(false);
    toast.success("Produto excluído com sucesso!");
  };

  // Cancela a edicao e restaura os valores ou fecha o dialog
  const handleCancel = () => {
    if (isEditing && product) {
      // Restaura os valores originais
      setProductName(product.name || "");
      setBrand(product.brand || "");
      setCodBar(product.codBar != null ? String(product.codBar) : "");
      setNcm(product.ncm != null ? String(product.ncm) : "");
      setCostValue(
        product.costValue != null
          ? product.costValue.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })
          : "",
      );
      setDateExp(product.dateExp ? new Date(product.dateExp) : undefined);
      setProductQuant(
        product.productQuant != null ? String(product.productQuant) : "",
      );
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
            <DialogTitle>Detalhes do produto</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Edite as informações do produto."
                : "Visualize as informações do produto."}
            </DialogDescription>
            <FieldSet className="my-3">
              <FieldGroup className="gap-3">
                {/* Nome do produto */}
                <Field>
                  <FieldLabel htmlFor="detail-name">Nome do produto</FieldLabel>
                  <Input
                    id="detail-name"
                    autoComplete="off"
                    placeholder="Digite o nome do produto..."
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    disabled={!isEditing}
                  />
                </Field>
                <FieldGroup className="flex-row">
                  {/* Código de barras */}
                  <Field className="flex-2">
                    <FieldLabel htmlFor="detail-codBar">
                      Código de barras
                    </FieldLabel>
                    <BaseInput
                      id="detail-codBar"
                      autoComplete="off"
                      placeholder="0"
                      value={codBar}
                      onChange={(e) => setCodBar(e.target.value)}
                      disabled={!isEditing}
                    >
                      <ScanBarcode />
                    </BaseInput>
                  </Field>
                  {/* NCM */}
                  <Field className="flex-1">
                    <FieldLabel htmlFor="detail-ncm">NCM</FieldLabel>
                    <BaseInput
                      id="detail-ncm"
                      autoComplete="off"
                      placeholder="0"
                      value={ncm}
                      onChange={(e) => setNcm(e.target.value)}
                      disabled={!isEditing}
                    >
                      <ChartBarIncreasing />
                    </BaseInput>
                  </Field>
                </FieldGroup>
                <FieldGroup className="flex-row">
                  {/* Marca do produto */}
                  <Field className="flex-2">
                    <FieldLabel htmlFor="detail-brand">
                      Marca do produto
                    </FieldLabel>
                    <Input
                      id="detail-brand"
                      autoComplete="off"
                      placeholder="Marca do produto..."
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      disabled={!isEditing}
                    />
                  </Field>
                  {/* Valor de custo */}
                  <Field className="flex-1">
                    <FieldLabel htmlFor="detail-costValue">
                      Valor de custo
                    </FieldLabel>
                    <BaseInput
                      id="detail-costValue"
                      autoComplete="off"
                      placeholder="0,00"
                      value={costValue}
                      onChange={(e) => setCostValue(e.target.value)}
                      disabled={!isEditing}
                    >
                      <p>R$</p>
                    </BaseInput>
                  </Field>
                </FieldGroup>
                <p className="border-t"></p>
                <FieldGroup className="flex-row">
                  {/* Data de validade */}
                  <Field className="flex-1">
                    <FieldLabel htmlFor="detail-dateExp">
                      Data de validade
                    </FieldLabel>
                    <DateCalendar
                      value={dateExp}
                      onDateChange={setDateExp}
                      disabled={!isEditing}
                    />
                  </Field>
                  {/* Quantidade do produto */}
                  <Field className="flex-1">
                    <FieldLabel htmlFor="detail-productQuant">
                      Quantidade do produto
                    </FieldLabel>
                    <BaseInput
                      id="detail-productQuant"
                      autoComplete="off"
                      placeholder="0"
                      value={productQuant}
                      onChange={(e) => setProductQuant(e.target.value)}
                      disabled={!isEditing}
                    >
                      <PackagePlus />
                    </BaseInput>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </FieldSet>
          </DialogHeader>
          {/* Modo visualizacao: botoes Excluir e Editar. Modo edicao: Cancelar e Salvar */}
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
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  <Trash2 />
                  Excluir
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
