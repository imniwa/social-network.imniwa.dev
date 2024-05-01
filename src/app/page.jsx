"use client";
import Graph from "@/components/Graph";
import data from "@/data/graph.json";
import { useState } from "react";

const Home = () => {
  const [centrality, setCentrality] = useState();
  return (
    <>
      <div className="relative">
        <div className="absolute top-0 bottom-0 right-0">
          <select
            name=""
            className="mt-5 mr-5"
            defaultValue={"default"}
            value={centrality}
            onChange={(e) => setCentrality(e.target.value)}
          >
            <option value="default">
              select centrality value
            </option>
            <option value="degree_c">degree centrality</option>
            <option value="betweenness_c">betweenness centrality</option>
            <option value="closeness_c">closeness centrality</option>
            <option value="eigenvector_c">eigenvector centrality</option>
          </select>
        </div>
        <Graph data={data} centrality={centrality}/>
      </div>
    </>
  );
};

export default Home;
