"use client";
import tweet from "@/data/tweet.json";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { clsx } from "clsx";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const TopicDetails = dynamic(() => import("@/components/TopicDetails"), {
  ssr: false,
});

export default function DataTable() {
  const { data } = tweet;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [count, setCount] = useState(data.length);

  const username = searchParams.get("username");
  const iteration = parseInt(searchParams.get("iteration")) || 0;
  const RANGE = 10;

  useEffect(() => {
    let temp = data
      .filter((v, i) =>
        username ? v.username.toLowerCase() === username : true
      )
      .map((v, i) => v.source.length);
    setCount(temp.reduce((a, b) => a + b, 0));
  }, [username, data]);

  const handleNext = () => {
    const params = new URLSearchParams(searchParams);
    if (username) {
      if (iteration >= Math.floor(count / RANGE)) return;
    }
    if (iteration >= Math.floor(count / RANGE)) return;
    params.set("iteration", iteration + 1);
    const query = params ? `?${params.toString()}` : "";
    router.push(`${pathname}${query}`, { scroll: false, shallow: true });
  };

  const handlePrevious = () => {
    const params = new URLSearchParams(searchParams);
    if (iteration <= 0) return;
    params.set("iteration", iteration - 1);
    const query = params ? `?${params.toString()}` : "";
    router.push(`${pathname}${query}`, { scroll: false, shallow: true });
  };

  return (
    <>
      {username && (
        <TopicDetails
          topic={
            data
              .filter((v, i) => v.username.toLowerCase() === username)
              .reduce((a, b) => {
                a.topic, b.topic;
              }).topic
          }
        />
      )}
      <div className="border border-slate-200 p-4 rounded-lg bg-slate-50 overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-slate-200">
          <thead>
            <tr className="capitalize gap-4 bg-slate-300">
              <th className="border border-slate-200 w-1/12">#</th>
              <th className="border border-slate-200 w-2/12">username</th>
              <th className="border border-slate-200 w-2/4">content</th>
            </tr>
          </thead>
          {
            <tbody>
              {!username &&
                data
                  .map((v, i) => v.source)
                  .flat()
                  .slice(iteration * RANGE, iteration * RANGE + RANGE)
                  .map((k, j) => {
                    return (
                      <tr key={j}>
                        <td className="border border-slate-200 text-center">
                          {j + 10 * iteration + 1}
                        </td>
                        <td className="border border-slate-200 text-center">
                          {k.username}
                        </td>
                        <td className="border border-slate-200 p-8">
                          {k.content}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          }
          {username &&
            data
              .filter((v, i) => v.username.toLowerCase() === username)
              .map((v, i) => {
                return (
                  <tbody key={i}>
                    {v.source
                      .slice(iteration * RANGE, iteration * RANGE + RANGE)
                      .map((k, j) => {
                        return (
                          <tr key={j}>
                            <td className="border border-slate-200 text-center">
                              {j + 10 * iteration + 1}
                            </td>
                            <td className="border border-slate-200 text-center">
                              {k.username.toLowerCase() === username ? (
                                <span className="bg-yellow-200 font-bold">
                                  {k.username}
                                </span>
                              ) : (
                                k.username
                              )}
                            </td>
                            <td className="border border-slate-200 p-8">
                              {k.content.split(" ").map((word, index) => {
                                if (v.topic.includes(word.toLowerCase())) {
                                  return (
                                    <React.Fragment key={`z-${index}`}>
                                      {" "}
                                      <span className="bg-green-200 font-bold">
                                        {word}
                                      </span>{" "}
                                    </React.Fragment>
                                  );
                                }
                                if (word.toLowerCase() === `@${username}`) {
                                  return (
                                    <React.Fragment key={`y-${index}`}>
                                      {" "}
                                      <span className="bg-yellow-200 font-bold">
                                        {word}
                                      </span>{" "}
                                    </React.Fragment>
                                  );
                                }
                                if (
                                  word.match(
                                    new RegExp(/https?:\/\/\S+|www\.\S+/)
                                  )
                                ) {
                                  return (
                                    <React.Fragment key={`x-${index}`}>
                                      {" "}
                                      <a
                                        href={word}
                                        className="text-blue-500 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {word}
                                      </a>{" "}
                                    </React.Fragment>
                                  );
                                }
                                return (
                                  <React.Fragment key={`w-${index}`}>
                                    {" "}
                                    <span>{word}</span>{" "}
                                  </React.Fragment>
                                );
                              })}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                );
              })}
        </table>
        <div className="mt-4 flex place-content-between">
          <div className="py-2 italic">Tweets count : {count}</div>
          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              className={clsx([
                "text-slate-400 bg-slate-50 border border-slate-400 rounded-md px-4 py-2",
                "hover:text-slate-800 hover:bg-white transition-all",
              ])}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className={clsx([
                "text-slate-400 bg-slate-50 border border-slate-400 rounded-md px-4 py-2",
                "hover:text-slate-800 hover:bg-white transition-all",
              ])}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
