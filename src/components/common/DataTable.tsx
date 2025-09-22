import * as React from "react";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
} from "@mui/x-data-grid";
import { Box, alpha, useTheme } from "@mui/material";

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

  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        "& .MuiDataGrid-root": {
          border: "none",
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[2],
          overflow: "hidden",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            color: theme.palette.text.primary,
            fontWeight: 600,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.paper,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.paper,
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
          },
          "& .MuiDataGrid-toolbarContainer": {
            padding: theme.spacing(2),
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
          },
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
            {
              outline: "none",
            },
          "& .MuiDataGrid-row": {
            cursor: "pointer",
            transition: theme.transitions.create(["background-color"]),
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.04),
            },
            "&.Mui-selected": {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
              },
            },
          },
        },
        "& .MuiTablePagination-root": {
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              margin: 0,
            },
        },
      }}
    >
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
        // Custom styling
        slotProps={{
          loadingOverlay: {
            sx: {
              backgroundColor: alpha(theme.palette.background.paper, 0.75),
            },
          },
          toolbar: {
            sx: {
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            },
          },
          pagination: {
            sx: {
              "& .MuiTablePagination-select": {
                borderRadius: 1,
              },
              "& .MuiTablePagination-actions .MuiButtonBase-root": {
                borderRadius: "50%",
                padding: "4px",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              },
            },
          },
        }}
      />
    </Box>
  );
}
