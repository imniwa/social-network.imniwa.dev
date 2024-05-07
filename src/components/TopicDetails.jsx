"use client";
export default function TopicDetails({ topic }) {
  return (
    <div className="border border-slate-200 p-4 rounded-lg bg-slate-50">
      <div className="flex place-content-center">
        <h1 className="text-center font-bold">Extracted Topic</h1>
      </div>
      <hr className="border border-slate-200 my-2 w-2/12 mx-auto" />
      <div className="flex gap-4 place-content-center capitalize flex-wrap">
        <table className="table-auto">
          <thead>
            <tr>
              {
                topic?.map((v, i) => {
                  return (
                    <th key={i} className="border border-slate-200 px-4 py-2">
                      Topic {i + 1}
                    </th>
                  );
                })
              }
            </tr>
          </thead>
          <tbody>
            <tr>
              {topic?.map((v, i) => {
                return (
                  <td key={i}>
                    <table className="table-auto border-collapse">
                      <thead>
                        <tr className="capitalize gap-4 bg-slate-300">
                          <th className="border border-slate-200">Word</th>
                          <th className="border border-slate-200">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {v.map((k, j) => {
                          return (
                            <tr key={j}>
                              <td className="border border-slate-200 px-4 py-2">{k.word}</td>
                              <td className="border border-slate-200 px-4 py-2">{k.score}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
