export interface Product {
  id?: string;
  name: string;
  brand?: string;
  codBar?: number;
  ncm?: number;
  costValue?: number;
  dateExp?: number;
  productQuant?: number;
}

export interface ColumnConfig {
  label: string;
  width: string;
}

export const nameProducts: ColumnConfig[] = [
  { label: "Codigo de barras", width: "15%" },
  { label: "Nome do produto", width: "35%" },
  { label: "Marca", width: "20%" },
  { label: "NCM", width: "15%" },
  { label: "Valor de custo", width: "15%" },
];
