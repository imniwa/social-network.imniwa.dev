"use client";

import { useSearchParams } from "next/navigation";

export default function NodeDetails() {
  const searchParams = useSearchParams();
  const data =
    searchParams.size &&
    JSON.parse(
      `{"${decodeURI(
        searchParams.toString().replace(/&/g, '","').replace(/=/g, '":"')
      )}"}`
    );
  return searchParams.get('username') ? (
    <div className="border border-slate-200 p-4 rounded-md bg-slate-50">
      <h1 className="font-bold">Node Details:</h1>
      <table>
        <tbody>
          {Object.entries(data).map((e, i) => {
            return (['username','degree', 'betweenness', 'closeness', 'eigenvector'].includes(e[0])) && (
              <tr key={i}>
                <td>{e[0]}</td>
                <td className="px-2">:</td>
                <td>{isFinite(e[1]) ? parseFloat(e[1]).toFixed(4) : e[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <></>
  );
}
