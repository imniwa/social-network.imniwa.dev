import { Suspense } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import Loading from "@/components/Loading";

export const metadata = {
  title: "Data used in this project",
};

const NodeDetails = dynamic(() => import("@/components/NodeDetails"), {
  ssr: false,
});
const DataTable = dynamic(() => import("@/components/DataTable"), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="container mx-auto flex flex-col gap-4 py-8">
      <div className="border border-slate-200 p-4 rounded-md bg-slate-50">
        <a
          className={clsx([
            "border border-slate-200 bg-slate-50 text-slate-400 px-4 py-2 rounded-md",
            "hover:bg-white hover:text-slate-800",
          ])}
          href="/"
        >
          Back to visualization
        </a>
      </div>
      <Suspense fallback={<Loading />}>
        <NodeDetails />
        <DataTable />
      </Suspense>
    </div>
  );
}
