import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "./product-data";
import { IconButton } from "@/components/icon-button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SearchIcon,
  Package,
  ScanBarcode,
  Blend,
} from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { BaseInput } from "@/components/base-input";
import { CreateProduct } from "../create-product";
import { ProductDetail } from "../product-detail";

interface ProductsTableProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export function ProductsTable({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}: ProductsTableProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // Controle do dialog de detalhes do produto
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  function goToFirstPage() {
    setPage(1);
  }

  function goToPreviousPage() {
    setPage(page - 1);
  }

  function goToNextPage() {
    if (page >= totalPages) return;
    setPage(page + 1);
  }

  function goToLastPage() {
    setPage(totalPages);
  }

  // onClick do input, vai pegar o valor digitado e armazenas no state search
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearch(query);
  }

  // Verificar se algo foi digitado no input, se sim ele filtra a tabela por
  // nome, deixa tudo em lower case e compara. Se não, ele mostra todos.
  const filteredProducts =
    search !== ""
      ? products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase()),
        )
      : products;

  // Math.max, garante que não fique com 0 paginas, terá sempre 1.
  // Math.ceil, divide o total de produtos por 5, para deixar apenas 5 produtos por pagina
  // e não deixa a pagina quebra, se eu tenho 12 produtos, serão 3 paginas
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / 4));

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-2 sm:gap-0">
        <BaseInput
          className="w-80"
          placeholder="Buscar produto"
          value={search}
          onChange={handleSearch}
        >
          <SearchIcon />
        </BaseInput>
        <div className="flex gap-2">
          <CreateProduct onAddProduct={onAddProduct} />
        </div>
      </div>
      <div>
        <Table>
          {/* Linha das colunas */}
          {filteredProducts.length > 0 ? (
            <TableBody className="flex flex-col gap-2">
              {filteredProducts
                .slice((page - 1) * 4, page * 4)
                .map((product) => (
                  <div className="rounded-md border">
                    <TableRow
                      key={product.id}
                      className="flex flex-row cursor-pointer hover:bg-muted/10 hover:rounded-md rounded-md p-2 gap-3"
                      // Ao clicar na linha, abre o dialog de detalhes
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsDetailOpen(true);
                      }}
                    >
                      <div className="flex justify-between  sm:items-center items-start w-full flex-col sm:flex-row gap-2 sm:gap-0">
                        <div className="flex flex-row gap-2">
                          <div className=" flex rounded-md items-center justify-center bg-primary/10 p-4 border border-primary">
                            <Package className="size-8 text-primary" />
                          </div>
                          <div className="flex flex-col">
                            <TableCell className="flex items-center gap-1 text-lg font-semibold">
                              {product.name}
                            </TableCell>
                            <TableCell className="flex items-center gap-1">
                              <ScanBarcode className="size-4 text-muted" />
                              {product.codBar}
                            </TableCell>
                            <TableCell className="flex items-center gap-1">
                              <Blend className="size-4 text-muted" />
                              {product.brand}
                            </TableCell>
                          </div>
                        </div>
                        <div className="border border-muted rounded-md text-center bg-muted/10">
                          <TableCell className="flex items-center p-2 ">
                            {product.costValue?.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </TableCell>
                        </div>
                      </div>
                    </TableRow>
                  </div>
                ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  <p>Você não possui nenhum produto registrado</p>
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          {/* Rodapé da tabela */}
          <TableFooter className="bg-background border-none">
            <TableRow>
              <TableCell colSpan={8} className="p-2">
                <TableCell className="flex justify-center items-center p-0">
                  <div className="flex items-center gap-2">
                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                      <ChevronsLeft />
                    </IconButton>
                    <IconButton
                      onClick={goToPreviousPage}
                      disabled={page === 1}
                    >
                      <ChevronLeft />
                    </IconButton>
                    <p>
                      <span className="m-1">{page}</span>
                      de
                      <span className="m-1">{totalPages}</span>
                    </p>
                    <IconButton
                      onClick={goToNextPage}
                      disabled={page === totalPages}
                    >
                      <ChevronRight />
                    </IconButton>
                    <IconButton
                      onClick={goToLastPage}
                      disabled={page === totalPages}
                    >
                      <ChevronsRight />
                    </IconButton>
                  </div>
                </TableCell>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Dialog de visualizacao, edicao e exclusao do produto */}
      <ProductDetail
        product={selectedProduct}
        isOpen={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onEditProduct={onEditProduct}
        onDeleteProduct={onDeleteProduct}
      />
    </>
  );
}
