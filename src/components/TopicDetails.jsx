"use client";
export default function TopicDetails({ topic }) {
  return (
    <div className="border border-slate-200 p-4 rounded-lg bg-slate-50">
      <div className="flex place-content-center">
        <h1 className="text-center font-bold">Extracted Topic</h1>
      </div>
      <hr className="border border-slate-200 my-2 w-2/12 mx-auto" />
      <div className="flex gap-4 place-content-center capitalize">
        {topic.map((v, i) => {
          return (
            <div className="" key={i}>
              {v}
            </div>
          );
        })}
      </div>
    </div>
  );
}
