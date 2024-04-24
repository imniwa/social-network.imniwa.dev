import Graph from '@/components/Graph';
import data from '@/data/graph.json';

export default function Page({params}){
    switch (params.slug) {
        case 'degree':
            return <Graph data={data} centrality={'degree_c'}/>
        case 'betweenness':
            return <Graph data={data} centrality={'betweenness_c'}/>
        case 'closeness':
            return <Graph data={data} centrality={'closeness_c'}/>
        case 'eigenvector':
            return <Graph data={data} centrality={'eigenvector_c'}/>

        default:
            return <div>Not Found</div>
    }
}