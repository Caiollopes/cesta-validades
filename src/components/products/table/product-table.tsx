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
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [page, setPage] = useState(1);

  //Ceil - retorna o numero inteiro menor 1.5 = retorna 1.0
  const totalPages = Math.ceil(products.length / 5);

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
                className="border-l text-center"
                style={{ width: col.width }}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Linha das colunas */}
        {products.length > 0 ? (
          <TableBody>
            {products.slice((page - 1) * 5, page * 5).map((product) => (
              <TableRow key={product.id} className="text-center">
                <TableCell>{product.codBar}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.ncm}</TableCell>
                <TableCell>{product.costValue}</TableCell>
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
