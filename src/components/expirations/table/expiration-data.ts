import type { ColumnConfig } from "../products/table/product-data";

// Colunas da tabela de validades
export const expirationColumns: ColumnConfig[] = [
  { label: "Codigo de barras", width: "20%" },
  { label: "Nome do produto", width: "25%" },
  { label: "Marca", width: "20%" },
  { label: "Data de validade", width: "20%" },
  { label: "Quantidade do produto", width: "15%" },
];
