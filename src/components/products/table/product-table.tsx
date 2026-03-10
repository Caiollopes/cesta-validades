import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { nameProducts, type Product } from "./product-data";
import { IconButton } from "@/components/icon-button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUp,
  ArrowDown,
  SearchIcon,
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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  // Controle do dialog de detalhes do produto
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Ordena os produtos por nome
  const sortedProducts = [...products].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (sortOrder === "asc") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  function handleSortToggle() {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setPage(1);
  }

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
      ? sortedProducts.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase()),
        )
      : sortedProducts;

  // Math.max, garante que não fique com 0 paginas, terá sempre 1.
  // Math.ceil, divide o total de produtos por 5, para deixar apenas 5 produtos por pagina
  // e não deixa a pagina quebra, se eu tenho 12 produtos, serão 3 paginas
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / 6));

  return (
    <>
      <div className="flex flex-row items-center justify-between">
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
      <div className="rounded-md border">
        <Table>
          {/* Nome das colunas */}
          <TableHeader>
            <TableRow>
              {nameProducts.map((col) => (
                <TableHead
                  key={col.label}
                  className=" text-center"
                  style={{ width: col.width }}
                >
                  {/* Se col.label for igual a "Nome do produto
                irá retornar o botão de ordernar ao lado dele, e
                se caso não for, ira retorna apenas o nome da coluna, normalmente" */}
                  {col.label === "Nome do produto" ? (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={handleSortToggle}
                        className="cursor-pointer hover:opacity-70 flex items-center justify-center gap-1"
                      >
                        {col.label}
                        {sortOrder === "asc" ? (
                          <ArrowUp size={16} />
                        ) : (
                          <ArrowDown size={16} />
                        )}
                      </button>
                    </div>
                  ) : (
                    col.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Linha das colunas */}
          {filteredProducts.length > 0 ? (
            <TableBody>
              {filteredProducts
                .slice((page - 1) * 6, page * 6)
                .map((product) => (
                  <TableRow
                    key={product.id}
                    className="text-center cursor-pointer hover:bg-muted"
                    // Ao clicar na linha, abre o dialog de detalhes
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsDetailOpen(true);
                    }}
                  >
                    <TableCell>{product.codBar}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.ncm}</TableCell>
                    <TableCell>
                      {product.costValue?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                  </TableRow>
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
          <TableFooter>
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
