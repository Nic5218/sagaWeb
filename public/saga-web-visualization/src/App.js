import './App.css';
import NeoGraph from './components/Neo4jGraph';
import Sidebar from './components/Sidebar';
import GraphVisualization from './components/GraphVisualization';

function App() {
    return (
        // <div className="App">
        //     <div id="container">
        //         <NeoGraph
        //             containerId={"neovis"}
        //             neo4jUri={"bolt://localhost:7687"}
        //             neo4jUser={"neo4j"}
        //             neo4jPassword={"1234567890"}
        //             backgroundColor={"#D3D3D3"}
        //             ref={graphRef}
        //         />
        //         <div id="overlay">
        //             <Sidebar graph={graphRef}/>
        //         </div>
        //     </div>
        // </div>
        <GraphVisualization 
            width={"100vw"}
            height={"100vh"}
            containerId={"neovis"}
            backgroundColor={"#d3d3d3"}
            neo4jUri={"bolt://localhost:7687"}
            neo4jUser={"neo4j"}
            neo4jPassword={"1234567890"}
        />
    )
}

export default App;
