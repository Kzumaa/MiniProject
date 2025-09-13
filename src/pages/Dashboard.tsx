import { useMemo, useState } from "react";
import Header from "@/components/base/Header";
import { Table, Column } from "@/components/shared/Table";

type Row = {
  id: number;
  name: string;
  owner: string;
  status: "active" | "paused" | "draft";
};

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Demo dataset
  const data: Row[] = useMemo(() => {
    return Array.from({ length: 42 }).map((_, i) => ({
      id: i + 1,
      name: `Project ${i + 1}`,
      owner: ["Alice", "Bob", "Carol", "Dave"][i % 4],
      status: (["active", "paused", "draft"] as const)[i % 3],
    }));
  }, []);

  const paged = data.slice((page - 1) * pageSize, page * pageSize);

  const columns: Column<Row>[] = [
    { key: "id", header: "ID", width: "80px" },
    { key: "name", header: "Name" },
    { key: "owner", header: "Owner" },
    { key: "status", header: "Status" },
  ];

  return (
    <div>
      <Header title="Dashboard" />
      <div className="mt-4 grid gap-4">
        <Table<Row>
          columns={columns}
          data={paged}
          pagination={{
            page,
            pageSize,
            total: data.length,
            onPageChange: setPage,
          }}
        />
      </div>
    </div>
  );
}
