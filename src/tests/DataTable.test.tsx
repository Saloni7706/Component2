import { render, screen } from "@testing-library/react";
import DataTable, { Column } from "../components/DataTable";

interface User {
  id: number;
  name: string;
}

const data: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

const columns: Column<User>[] = [{ key: "name", title: "Name", dataIndex: "name", sortable: true }];

describe("DataTable", () => {
  it("renders data", () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });
});
