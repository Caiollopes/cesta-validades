import type { ColumnConfig } from "@/components/products/table/product-data";

// Colunas da tabela de validades
export const expirationColumns: ColumnConfig[] = [
  { label: "Codigo de barras", width: "15%" },
  { label: "Nome do produto", width: "25%" },
  { label: "Marca", width: "15%" },
  { label: "Data de validade", width: "15%" },
  { label: "Dias restantes", width: "15%" },
  { label: "Quantidade do produto", width: "15%" },
];
