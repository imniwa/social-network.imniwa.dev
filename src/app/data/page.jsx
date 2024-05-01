import tweet from "@/data/tweet.json";

export const metadata = {
  title: "Data used in this project",
};

export default function Page() {
  const { data } = tweet;
  return (
    <div className="container mx-auto">
      <h1 className="text-center font-bold text-2xl my-8">Coldplay</h1>
      <div className="table">
        <table className="table-auto">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Mention</th>
              <th>Keyword</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{val.username}</td>
                <td>{val.mention}</td>
                <td className="flex gap-4">{val.tf_idf.map((v, i) => (
                    <span key={i}>{v.token}:{Math.round((v.score + Number.EPSILON) * 100) / 100}</span>
                ))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
