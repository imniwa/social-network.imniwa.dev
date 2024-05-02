import dynamic from "next/dynamic";

export const metadata = {
  title: "Data used in this project",
};

const NodeDetails = dynamic(() => import('@/components/NodeDetails'))
const DataTable = dynamic(() => import('@/components/DataTable'))

export default function Page() {
  return (
    <div className="container mx-auto flex flex-col gap-4 py-8">
      <NodeDetails />
      <DataTable />
    </div>
  );
}
