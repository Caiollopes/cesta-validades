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
import { ExpirationDetail } from "@/components/expirations/expiration-detail";
import { ExpirationColorConfig } from "./expiration-color-config";
import { differenceInCalendarDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";

function getExpirationRowClass(
  dateExp: number | undefined,
  redDays: number,
  yellowDays: number,
): string {
  if (!dateExp) return "";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(dateExp);
  exp.setHours(0, 0, 0, 0);
  const diffDays = differenceInCalendarDays(exp, today);
  if (diffDays <= redDays) return "bg-red-100 dark:bg-red-900/30";
  if (diffDays <= yellowDays) return "bg-yellow-100 dark:bg-yellow-900/30";
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
}: ExpirationTableProps) {
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [dateSortOrder, setDateSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"name" | "date">("name");
  const [search, setSearch] = useState("");
  // Controle do dialog de detalhes do produto
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  // Thresholds de cor
  const [redDays, setRedDays] = useState(10);
  const [yellowDays, setYellowDays] = useState(20);

  // Ordena os produtos por nome ou data
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = a.dateExp ?? 0;
      const dateB = b.dateExp ?? 0;
      return dateSortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return sortOrder === "asc"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  function handleSortToggle() {
    setSortBy("name");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setPage(1);
  }

  function handleDateSortToggle() {
    setSortBy("date");
    setDateSortOrder(dateSortOrder === "asc" ? "desc" : "asc");
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

  // Para cada produto, pega a entrada com a data mais próxima
  type FlatRow = {
    product: Product;
    dateExp: number | undefined;
    productQuant: number | undefined;
  };

  const flatRows: FlatRow[] = filteredProducts.map((product) => {
    if (product.expirations && product.expirations.length > 0) {
      const nearest = product.expirations
        .filter((e) => e.dateExp > 0)
        .sort((a, b) => a.dateExp - b.dateExp)[0];
      return {
        product,
        dateExp: nearest?.dateExp,
        productQuant: nearest?.productQuant,
      };
    }
    return {
      product,
      dateExp: product.dateExp,
      productQuant: product.productQuant,
    };
  });

  const totalPages = Math.max(1, Math.ceil(flatRows.length / 6));

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
        <ExpirationColorConfig
          redDays={redDays}
          yellowDays={yellowDays}
          onSave={(r, y) => {
            setRedDays(r);
            setYellowDays(y);
          }}
        />
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
                        {sortBy === "name" &&
                          (sortOrder === "asc" ? (
                            <ArrowUp size={16} />
                          ) : (
                            <ArrowDown size={16} />
                          ))}
                      </button>
                    </div>
                  ) : col.label === "Data de validade" ? (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={handleDateSortToggle}
                        className="cursor-pointer hover:opacity-70 flex items-center justify-center gap-1"
                      >
                        {col.label}
                        {sortBy === "date" &&
                          (dateSortOrder === "asc" ? (
                            <ArrowUp size={16} />
                          ) : (
                            <ArrowDown size={16} />
                          ))}
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
          {flatRows.length > 0 ? (
            <TableBody>
              {flatRows
                .slice((page - 1) * 6, page * 6)
                .map(({ product, dateExp, productQuant }) => (
                  <TableRow
                    key={product.id ?? product.name}
                    className={`text-center cursor-pointer hover:bg-muted ${getExpirationRowClass(dateExp, redDays, yellowDays)}`}
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
                      {dateExp
                        ? format(new Date(dateExp), "dd/MM/yyyy", {
                            locale: ptBR,
                          })
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {dateExp
                        ? (() => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const exp = new Date(dateExp);
                            exp.setHours(0, 0, 0, 0);
                            const diff = differenceInCalendarDays(exp, today);
                            if (diff < 0) return "Vencido";
                            if (diff === 0) return "Vence hoje";
                            return `${diff} dia${diff !== 1 ? "s" : ""}`;
                          })()
                        : "-"}
                    </TableCell>
                    <TableCell>{productQuant}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <p>Você não possui nenhuma validade registrada</p>
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

      {/* Dialog de visualizacao e edicao de validade e quantidade */}
      <ExpirationDetail
        product={selectedProduct}
        isOpen={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onEditProduct={onEditProduct}
      />
    </>
  );
}
