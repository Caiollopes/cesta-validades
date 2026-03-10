import { ProductsTable } from "../products/table/product-table";
import { useState, useEffect } from "react";
import type { Product } from "../products/table/product-data";
import { toast } from "sonner";

const STORAGE_KEY = "cesta-products";

export function ProductsPage() {
  // Busca os produtos ja salvos no localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    const storedProducts = localStorage.getItem(STORAGE_KEY);
    if (storedProducts) {
      try {
        return JSON.parse(storedProducts);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        toast.error("Erro ao carregar produtos!");
      }
    }
    return [];
  });

  // Salva produtos no localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  // Atualiza um produto existente pelo id
  const handleEditProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p,
      ),
    );
  };

  // Remove um produto pelo id
  const handleDeleteProduct = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== productId),
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <ProductsTable
        products={products}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
}
