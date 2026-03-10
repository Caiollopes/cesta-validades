import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { expirationColumns } from "./expiration-data";
import type { Product } from "@/components/products/table/product-data";
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
import { ProductDetail } from "@/components/products/product-detail";
import { differenceInCalendarDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";

function getExpirationRowClass(dateExp?: number): string {
  if (!dateExp) return "";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(dateExp);
  exp.setHours(0, 0, 0, 0);
  const diffDays = differenceInCalendarDays(exp, today);
  if (diffDays <= 10) return "bg-red-100 dark:bg-red-900/30";
  if (diffDays <= 20) return "bg-yellow-100 dark:bg-yellow-900/30";
  return "bg-blue-100 dark:bg-blue-900/30";
}

interface ExpirationTableProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export function ExpirationTable({
  products,
  onEditProduct,
  onDeleteProduct,
}: ExpirationTableProps) {
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

  // onClick do input, vai pegar o valor digitado e armazenar no state search
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearch(query);
  }

  // Filtra a tabela por nome
  const filteredProducts =
    search !== ""
      ? sortedProducts.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase()),
        )
      : sortedProducts;

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / 6));

  return (
    <>
      {/* Apenas o input de busca, sem botao de criar produto */}
      <div className="flex flex-row items-center justify-between">
        <BaseInput
          className="w-80"
          placeholder="Buscar produto"
          value={search}
          onChange={handleSearch}
        >
          <SearchIcon />
        </BaseInput>
      </div>
      <div className="rounded-md border">
        <Table>
          {/* Colunas da tabela de validades */}
          <TableHeader>
            <TableRow>
              {expirationColumns.map((col) => (
                <TableHead
                  key={col.label}
                  className=" text-center"
                  style={{ width: col.width }}
                >
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

          {/* Linhas da tabela */}
          {filteredProducts.length > 0 ? (
            <TableBody>
              {filteredProducts
                .slice((page - 1) * 6, page * 6)
                .map((product) => (
                  <TableRow
                    key={product.id}
                    className={`text-center cursor-pointer hover:bg-muted ${getExpirationRowClass(product.dateExp)}`}
                    // Ao clicar na linha, abre o dialog de detalhes
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsDetailOpen(true);
                    }}
                  >
                    <TableCell>{product.codBar}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      {product.dateExp
                        ? format(new Date(product.dateExp), "dd/MM/yyyy", {
                            locale: ptBR,
                          })
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {product.dateExp
                        ? (() => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const exp = new Date(product.dateExp);
                            exp.setHours(0, 0, 0, 0);
                            const diff = differenceInCalendarDays(exp, today);
                            if (diff < 0) return "Vencido";
                            if (diff === 0) return "Vence hoje";
                            return `${diff} dia${diff !== 1 ? "s" : ""}`;
                          })()
                        : "-"}
                    </TableCell>
                    <TableCell>{product.productQuant}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <p>Você não possui nenhum produto registrado</p>
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          {/* Rodape da tabela */}
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} className="p-2">
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
