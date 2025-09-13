import { ReactNode } from 'react'

export type Column<T> = {
  key: keyof T | string
  header: string
  width?: string
  render?: (row: T) => ReactNode
}

export type TableProps<T> = {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  pagination?: {
    page: number
    pageSize: number
    total: number
    onPageChange: (page: number) => void
  }
}

export function Table<T extends object>({ columns, data, loading, pagination }: TableProps<T>) {
  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((c) => (
                <th key={String(c.key)} className="px-4 py-3 text-left text-xs font-semibold text-gray-500" style={{ width: c.width }}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td className="px-4 py-8 text-center text-gray-500" colSpan={columns.length}>Loading...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-gray-500" colSpan={columns.length}>No data</td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {columns.map((c) => (
                    <td key={String(c.key)} className="px-4 py-3 text-sm">
                      {c.render ? c.render(row) : String((row as any)[c.key as any] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50 text-sm">
          <span>
            Page <b>{pagination.page}</b> of <b>{Math.max(1, Math.ceil(pagination.total / pagination.pageSize))}</b>
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded-lg border disabled:opacity-50"
              onClick={() => pagination.onPageChange(Math.max(1, pagination.page - 1))}
              disabled={pagination.page <= 1}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 rounded-lg border disabled:opacity-50"
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page * pagination.pageSize >= pagination.total}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
