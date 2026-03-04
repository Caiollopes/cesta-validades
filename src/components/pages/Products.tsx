import { ProductsTable } from "../products/table/product-table";
import { CreateProduct } from "../products/create-product";
import { SearchIcon } from "lucide-react";
import { BaseInput } from "../base-input";
import { useState } from "react";
import type { Product } from "../products/table/product-data";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <BaseInput className="w-80" placeholder="Buscar produto">
          <SearchIcon />
        </BaseInput>
        <CreateProduct onAddProduct={handleAddProduct} />
      </div>
      <ProductsTable products={products} />
    </div>
  );
}
