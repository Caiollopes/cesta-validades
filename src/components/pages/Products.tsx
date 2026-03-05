import { ProductsTable } from "../products/table/product-table";
import { useState, useEffect } from "react";
import type { Product } from "../products/table/product-data";

const STORAGE_KEY = "cesta-products";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(() => {
    const storedProducts = localStorage.getItem(STORAGE_KEY);
    if (storedProducts) {
      try {
        return JSON.parse(storedProducts);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }
    return [];
  });

  // Salva produtos no localStorage quando mudam
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <div className="flex flex-col gap-4">
      <ProductsTable products={products} onAddProduct={handleAddProduct} />
    </div>
  );
}
