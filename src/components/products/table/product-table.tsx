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
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  //Ceil - retorna o numero inteiro menor 1.5 = retorna 1.0
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / 5));

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

  return (
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
                {/* Se col.label for igua a "Nome do produto
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
        {sortedProducts.length > 0 ? (
          <TableBody>
            {sortedProducts.slice((page - 1) * 5, page * 5).map((product) => (
              <TableRow key={product.id} className="text-center">
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
                {/* <TableCell>
                  {product.dateExp
                    ? format(new Date(product.dateExp), "dd/MM/yyyy", {
                        locale: ptBR,
                      })
                    : "-"}
                </TableCell> */}
                {/* <TableCell>{product.productQuant}</TableCell> */}
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
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
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
  );
}
