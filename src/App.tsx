import React, { useState } from "react";
import DataTable, { Column } from "./components/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<User[]>([]);

  const data: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" }
  ];

  const columns: Column<User>[] = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "email", title: "Email", dataIndex: "email" }
  ];

  return (
    <div className="container">
      <h1>DataTable Demo</h1>
      <DataTable
        data={data}
        columns={columns}
        loading={false}
        selectable
        onRowSelect={setSelectedRows}
      />
      <div className="selected">
        <h2>Selected Rows</h2>
        <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
