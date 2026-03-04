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

export const validProducts: ColumnConfig[] = [
  { label: "Nome do produto", width: "25%" },
  { label: "Marca", width: "15%" },
  { label: "Codigo de barras", width: "15%" },
  { label: "NCM", width: "10%" },
  { label: "Valor de custo", width: "12%" },
  { label: "Data de validade", width: "13%" },
  { label: "Quantidade do produto", width: "10%" },
];

// export const productsData: Product[] = [
//   {
//     id: "1",
//     name: "Arroz 1kg",
//     brand: "Camilo",
//     codBar: 1234567890,
//     ncm: 1234,
//     costValue: 5,
//     dateExp: 345677,
//     productQuant: 10,
//   },
// ];
