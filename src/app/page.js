// pages/index.js
import Graph from '@/components/Graph';
import data from '@/data/graph.json';

const Home = () => {
  return (
    <>
      <Graph data={data} />
    </>
  );
};

export default Home;
