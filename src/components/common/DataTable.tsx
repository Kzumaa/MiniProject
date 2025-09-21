import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";

type Props<T> = {
  rows: T[];
  columns: GridColDef[];
  rowId: (row: T) => string | number;
  loading?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    rowCount?: number;
    onChange: (m: GridPaginationModel) => void;
  };
};

export default function DataTable<T>({
  rows,
  columns,
  rowId,
  loading,
  pagination,
}: Props<T>) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row) => rowId(row as T)}
      loading={!!loading}
      paginationMode={pagination ? "server" : "client"}
      paginationModel={
        pagination
          ? { page: pagination.page, pageSize: pagination.pageSize }
          : undefined
      }
      onPaginationModelChange={pagination ? pagination.onChange : undefined}
      rowCount={pagination?.rowCount}
      disableRowSelectionOnClick
    />
  );
}
