import { useMemo } from "react";
import { useQueue, QueueEntry } from "@/lib/hooks/useQueue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { Spinner } from "../spinner";

interface CustomColumnMeta<TData, TValue> {
  responsive?: {
    hideOnMobile?: boolean;
  };
}

interface QueueAdminTableProps {
  selectedBarber: string | null;
}

export const QueueAdminTable = ({ selectedBarber }: QueueAdminTableProps) => {
  const { queueEntries, loading, error, refetch } = useQueue();

  const filteredEntries = useMemo(() => {
    if (!queueEntries) return [];
    return selectedBarber
      ? queueEntries.filter((entry) => entry.barberId === selectedBarber)
      : queueEntries;
  }, [queueEntries, selectedBarber]);

  const table = useReactTable({
    data: filteredEntries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }


  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Erro: {error}
        <button
          onClick={refetch}
          className="ml-2 text-blue-500 underline"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-full border border-gray-200/20 rounded-lg">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-zinc-900">
              {headerGroup.headers.map((header) => {
                const hideOnMobile =
                  (header.column.columnDef.meta as CustomColumnMeta<
                    QueueEntry,
                    any
                  >)?.responsive?.hideOnMobile ?? false;
                return (
                  <TableHead
                    key={header.id}
                    className={`px-4 py-2 text-left text-sm font-medium text-white ${
                      hideOnMobile ? "hidden md:table-cell" : ""
                    }`}
                    style={{ width: header.column.columnDef.size }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-b border-gray-200/50 hover:bg-zinc-800"
              >
                {row.getVisibleCells().map((cell) => {
                  const hideOnMobile =
                    (cell.column.columnDef.meta as CustomColumnMeta<
                      QueueEntry,
                      any
                    >)?.responsive?.hideOnMobile ?? false;
                  return (
                    <TableCell
                      key={cell.id}
                      className={`px-4 py-2 text-sm text-white ${
                        hideOnMobile ? "hidden md:table-cell" : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="py-4 text-center text-gray-500"
              >
                Nenhuma entrada na fila.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end gap-2 p-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 text-white bg-zinc-800 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 text-white bg-zinc-800 rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};