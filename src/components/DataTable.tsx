import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey as keyof T];
    const bValue = b[sortKey as keyof T];
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSelect = (rowIndex: number, row: T) => {
    const newSelected = new Set(selected);
    if (newSelected.has(rowIndex)) {
      newSelected.delete(rowIndex);
    } else {
      newSelected.add(rowIndex);
    }
    setSelected(newSelected);
    if (onRowSelect) {
      onRowSelect(Array.from(newSelected).map((i) => sortedData[i]));
    }
  };

  if (loading) {
    return <div role="status">Loading...</div>;
  }

  if (data.length === 0) {
    return <div role="status">No data available</div>;
  }

  return (
    <table className="datatable" aria-label="Data Table">
      <thead>
        <tr>
          {selectable && <th>Select</th>}
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => col.sortable && handleSort(col.key)}
              role={col.sortable ? "button" : undefined}
              aria-sort={sortKey === col.key ? sortOrder : "none"}
            >
              {col.title}{" "}
              {sortKey === col.key ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {selectable && (
              <td>
                <input
                  type="checkbox"
                  checked={selected.has(rowIndex)}
                  onChange={() => handleSelect(rowIndex, row)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key}>{String(row[col.dataIndex])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ✅ Export both default and named
export default DataTable;
export { DataTable };
