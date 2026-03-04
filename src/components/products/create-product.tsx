import {
  ChartBarIncreasing,
  PackagePlus,
  Plus,
  ScanBarcode,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldSet, FieldGroup, Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { BaseInput } from "../base-input";
import { DateCalendar } from "../date-calendar";
import { useState } from "react";
import type { Product } from "./table/product-data";

interface CreateProductProps {
  onAddProduct: (product: Product) => void;
}

export function CreateProduct({ onAddProduct }: CreateProductProps) {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [codBar, setCodBar] = useState("");
  const [ncm, setNcm] = useState("");
  const [costValue, setCostValue] = useState("");
  const [dateExp, setDateExp] = useState<Date | undefined>();
  const [productQuant, setProductQuant] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onAddProduct) {
      onAddProduct({
        id: String(Date.now()),
        name: productName,
        brand: brand || "-",
        codBar: Number(codBar) || 0,
        ncm: Number(ncm) || 0,
        costValue: Number(costValue) || 0,
        dateExp: dateExp ? dateExp.getTime() : 0,
        productQuant: Number(productQuant) || 0,
      });
    }

    // Limpar formulário
    setProductName("");
    setBrand("");
    setCodBar("");
    setNcm("");
    setCostValue("");
    setDateExp(undefined);
    setProductQuant("");
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            Criar produto
          </Button>
        </DialogTrigger>
        <form>
          <DialogContent className="w-100">
            <DialogHeader>
              <DialogTitle>Produto</DialogTitle>
              <DialogDescription>Crie um produto.</DialogDescription>
              <FieldSet className="my-3">
                <FieldGroup className="gap-3">
                  {/* Nome do produto */}
                  <Field>
                    <FieldLabel htmlFor="name">Nome do produto</FieldLabel>
                    <Input
                      id="name"
                      autoComplete="off"
                      placeholder="Digite o nome do produto..."
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </Field>
                  <FieldGroup className="flex-row">
                    {/* Código de barras */}
                    <Field className="flex-2">
                      <FieldLabel htmlFor="codBar">Código de barras</FieldLabel>
                      <BaseInput
                        id="codBar"
                        autoComplete="off"
                        placeholder="0"
                        value={codBar}
                        onChange={(e) => setCodBar(e.target.value)}
                      >
                        <ScanBarcode />
                      </BaseInput>
                    </Field>
                    {/* NCM */}
                    <Field className="flex-1">
                      <FieldLabel htmlFor="ncm">NCM</FieldLabel>
                      <BaseInput
                        id="ncm"
                        autoComplete="off"
                        placeholder="0"
                        value={ncm}
                        onChange={(e) => setNcm(e.target.value)}
                      >
                        <ChartBarIncreasing />
                      </BaseInput>
                    </Field>
                  </FieldGroup>
                  <FieldGroup className="flex-row">
                    {/* Marca do produto */}
                    <Field className="flex-2">
                      <FieldLabel htmlFor="brand">Marca do produto</FieldLabel>
                      <Input
                        id="brand"
                        autoComplete="off"
                        placeholder="Digite a marca do produto..."
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </Field>
                    {/* Valor de custo */}
                    <Field className="flex-1">
                      <FieldLabel htmlFor="costValue">
                        Valor de custo
                      </FieldLabel>
                      <BaseInput
                        id="costValue"
                        autoComplete="off"
                        placeholder="0,00"
                        value={costValue}
                        onChange={(e) => setCostValue(e.target.value)}
                      >
                        <p>R$</p>
                      </BaseInput>
                    </Field>
                  </FieldGroup>
                  <p className="border-t"></p>
                  <FieldGroup className="flex-row">
                    {/* Data de validade */}
                    <Field className="flex-1">
                      <FieldLabel htmlFor="dateExp">
                        Data de validade
                      </FieldLabel>
                      <DateCalendar value={dateExp} onDateChange={setDateExp} />
                    </Field>
                    {/* Quantidade do produto */}
                    <Field className="flex-1">
                      <FieldLabel htmlFor="productQuant">
                        Quantidade do produto
                      </FieldLabel>
                      <BaseInput
                        id="productQuant"
                        autoComplete="off"
                        placeholder="0"
                        value={productQuant}
                        onChange={(e) => setProductQuant(e.target.value)}
                      >
                        <PackagePlus />
                      </BaseInput>
                    </Field>
                  </FieldGroup>
                </FieldGroup>
              </FieldSet>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" onClick={handleSubmit}>
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
