import * as React from "react";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
} from "@mui/x-data-grid";

type PaginationCfg = {
  page: number; // 0-based
  pageSize: number;
  rowCount: number;
  onChange: (m: GridPaginationModel) => void;
};

type SortingCfg = {
  sortModel: GridSortModel; // e.g. [{ field: 'name', sort: 'asc' }]
  onChange: (m: GridSortModel) => void;
};

type Props<T> = {
  rows: T[];
  columns: GridColDef[];
  rowId: (row: T) => string | number;
  loading?: boolean;
  pagination: PaginationCfg;
  sorting: SortingCfg;
};

export default function DataTable<T>({
  rows,
  columns,
  rowId,
  loading,
  pagination,
  sorting,
}: Props<T>) {
  // Stable models to avoid infinite loops
  const paginationModel = React.useMemo<GridPaginationModel>(
    () => ({ page: pagination.page, pageSize: pagination.pageSize }),
    [pagination.page, pagination.pageSize]
  );

  const sortModel = React.useMemo<GridSortModel>(
    () => sorting.sortModel,
    [sorting.sortModel]
  );

  const handlePaginate = React.useCallback(
    (m: GridPaginationModel) => {
      if (m.page !== pagination.page || m.pageSize !== pagination.pageSize) {
        pagination.onChange(m);
      }
    },
    [pagination]
  );

  const handleSort = React.useCallback(
    (m: GridSortModel) => {
      // Only fire when it actually changes
      const prev = sorting.sortModel[0];
      const next = m[0];
      const changed =
        !!prev?.field !== !!next?.field ||
        prev?.field !== next?.field ||
        prev?.sort !== next?.sort;
      if (changed) sorting.onChange(m);
    },
    [sorting]
  );

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row) => rowId(row as T)}
      loading={!!loading}
      disableRowSelectionOnClick
      // Server pagination
      paginationMode="server"
      rowCount={pagination.rowCount}
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginate}
      // Server sorting
      sortingMode="server"
      sortModel={sortModel}
      onSortModelChange={handleSort}
    />
  );
}
