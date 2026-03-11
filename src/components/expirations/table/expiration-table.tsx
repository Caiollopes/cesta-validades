import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "@/components/products/table/product-data";
import { IconButton } from "@/components/icon-button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SearchIcon,
  Blend,
  Package,
  ScanBarcode,
  Calendar,
} from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { BaseInput } from "@/components/base-input";
import { ExpirationDetail } from "@/components/expirations/expiration-detail";
import { ExpirationColorConfig } from "./expiration-color-config";
import { differenceInCalendarDays } from "date-fns";

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
  if (diffDays <= redDays) return "bg-red-700/10 border-red-700 text-red-700";
  if (diffDays <= yellowDays)
    return "bg-yellow-700/10 border-yellow-700 text-yellow-700";
  return "bg-blue-700/10 border-blue-700 text-blue-700";
}

function getExpirationTextClass(
  dateExp: number | undefined,
  redDays: number,
  yellowDays: number,
): string {
  return getExpirationRowClass(dateExp, redDays, yellowDays)
    .split(" ")
    .filter((cls) => !cls.startsWith("bg-") && !cls.startsWith("dark:bg-"))
    .join(" ");
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
  const [search, setSearch] = useState("");
  // Controle do dialog de detalhes do produto
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  // Thresholds de cor
  const [redDays, setRedDays] = useState(10);
  const [yellowDays, setYellowDays] = useState(20);

  // Ordena os produtos pela data de validade mais próxima
  const sortedProducts = [...products].sort((a, b) => {
    const dateA = a.dateExp ?? 0;
    const dateB = b.dateExp ?? 0;
    return dateA - dateB;
  });

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

  const totalPages = Math.max(1, Math.ceil(flatRows.length / 4));

  return (
    <>
      {/* Apenas o input de busca, sem botao de criar produto */}
      <div className="flex flex-row items-center justify-between gap-2 sm:gap-0">
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
      <div>
        <Table>
          {/* Linhas da tabela */}
          {flatRows.length > 0 ? (
            <TableBody className="flex flex-col gap-2">
              {flatRows
                .slice((page - 1) * 4, page * 4)
                .map(({ product, dateExp, productQuant }) => (
                  <div className="rounded-md border">
                    <TableRow
                      key={product.id ?? product.name}
                      className={`flex flex-row cursor-pointer hover:bg-muted/10 hover:rounded-md rounded-md p-2 gap-3 `}
                      // Ao clicar na linha, abre o dialog de detalhes
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsDetailOpen(true);
                      }}
                    >
                      <div className="flex justify-between  sm:items-center items-start w-full flex-col sm:flex-row gap-2 sm:gap-0">
                        <div className="flex flex-row gap-2">
                          <div
                            className={`flex rounded-md  items-center justify-center p-4 border ${getExpirationRowClass(dateExp, redDays, yellowDays)}`}
                          >
                            <Package
                              className={`size-8 ${getExpirationTextClass(dateExp, redDays, yellowDays)}`}
                            />
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
                        <div
                          className={`flex flex-row items-center p-3 border rounded-md text-center gap-3 ${getExpirationTextClass(dateExp, redDays, yellowDays)}`}
                        >
                          {/* <TableCell className="flex flex-row items-center gap-1">
                              {dateExp
                                ? format(new Date(dateExp), "dd/MM/yyyy", {
                                    locale: ptBR,
                                  })
                                : "-"}
                            </TableCell> */}
                          <TableCell className="flex flex-row items-center gap-1">
                            <Package className="size-4" />
                            {productQuant}
                          </TableCell>
                          <TableCell className="flex flex-row items-center gap-1">
                            <Calendar className="size-4" />
                            {dateExp
                              ? (() => {
                                  const today = new Date();
                                  today.setHours(0, 0, 0, 0);
                                  const exp = new Date(dateExp);
                                  exp.setHours(0, 0, 0, 0);
                                  const diff = differenceInCalendarDays(
                                    exp,
                                    today,
                                  );
                                  if (diff < 0) return "Vencido";
                                  if (diff === 0) return "Vence hoje";
                                  return `${diff} dia${diff !== 1 ? "s" : ""}`;
                                })()
                              : "-"}
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
                <TableCell colSpan={6} className="text-center">
                  <p>Você não possui nenhuma validade registrada</p>
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          {/* Rodape da tabela */}
          <TableFooter className="bg-background border-none">
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
