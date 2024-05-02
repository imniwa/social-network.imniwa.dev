"use client";
import tweet from "@/data/tweet.json";
import { useState } from "react";
import { clsx } from "clsx";

export default function DataTable() {
  const RANGE = 10;
  const [iteration, setIteration] = useState(0);
  const { data } = tweet;

  const handleNext = () => {
    if (iteration >= Math.ceil(data.length / RANGE)) return;
    setIteration(iteration + 1);
  };

  const handlePrevious = () => {
    if (iteration <= 0) return;
    setIteration(iteration - 1);
  };

  return (
    <div className="border border-slate-200 p-4 rounded-lg bg-slate-50">
      <table className="table-fixed w-full border-collapse border border-slate-200">
        <thead>
          <tr className="capitalize gap-4 bg-slate-400">
            <th className="border border-slate-200 w-1/12">#</th>
            <th className="border border-slate-200 w-2/12">source</th>
            <th className="border border-slate-200 w-2/12">target</th>
            <th className="border border-slate-200 w-2/4">content</th>
            <th className="border border-slate-200 w-2/4">extracted topic</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(iteration*RANGE, iteration*RANGE+RANGE).map((e, i) => {
            return (
              <tr key={i}>
                <td className="border border-slate-200 text-center">{i + (10*iteration) + 1}</td>
                <td className="border border-slate-200 text-center">
                  {e.username}
                </td>
                <td className="border border-slate-200 text-center">
                  {e.mention}
                </td>
                <td className="border border-slate-200">{e.raw_content}</td>
                <td className="border border-slate-200">
                  <table className="table-auto w-full border-collapse border border-slate-200">
                    <thead>
                      <tr>
                        <th className="border border-slate-200">Token</th>
                        <th className="border border-slate-200">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {e.tf_idf
                        .sort((a, b) => b.score - a.score)
                        .map((e, i) => {
                          return (
                            <tr key={i}>
                              <td className="border border-slate-200 text-center">
                                {e.token}
                              </td>
                              <td className="border border-slate-200 text-center">
                                {e.score.toFixed(4)}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 flex flex-row-reverse">
        <div className="flex gap-4">
          <button onClick={handlePrevious}
            className={clsx([
              "text-slate-400 bg-slate-50 border border-slate-400 rounded-sm px-4 py-2",
              "hover:text-slate-800 hover:bg-white transition-all",
            ])}
          >
            Previous
          </button>
          <button onClick={handleNext}
            className={clsx([
              "text-slate-400 bg-slate-50 border border-slate-400 rounded-sm px-4 py-2",
              "hover:text-slate-800 hover:bg-white transition-all",
            ])}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
