import { ProductsTable } from "../products/table/product-table";
import { useState } from "react";
import type { Product } from "../products/table/product-data";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <div className="flex flex-col gap-4">
      <ProductsTable products={products} onAddProduct={handleAddProduct} />
    </div>
  );
}
