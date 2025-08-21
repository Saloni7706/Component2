import type { Meta, StoryObj } from "@storybook/react";
import { DataTable, Column } from "../components/DataTable";

interface User {
  id: number;
  name: string;
}

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

const data: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name" },
];

export const Default: Story = {
  args: {
    data,
    columns,
  },
};
