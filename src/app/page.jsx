"use client";
import Graph from "@/components/Graph";
import data from "@/data/graph.json";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Home = () => {
  const searchParams = useSearchParams();
  const centrality = searchParams.get("centrality") || "default";
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (centrality) => {
    const params = new URLSearchParams(searchParams.entries());
    if (centrality) {
      params.set("centrality", centrality);
    } else {
      params.delete("centrality");
    }
    const query = params ? `?${params.toString()}` : "";
    router.push(`${pathname}${query}`);
  };

  return (
    <>
      <div className="relative">
        <div className="absolute top-0 right-0 bg-slate-500/60">
          <div className="p-8">
            <select
              name=""
              className="p-2"
              value={centrality}
              onChange={(e) => handleSearch(e.target.value)}
            >
              <option value="default">select centrality value</option>
              <option value="degree_c">degree centrality</option>
              <option value="betweenness_c">betweenness centrality</option>
              <option value="closeness_c">closeness centrality</option>
              <option value="eigenvector_c">eigenvector centrality</option>
            </select>
          </div>
        </div>
        <Graph data={data} centrality={centrality} />
      </div>
    </>
  );
};

export default Home;
