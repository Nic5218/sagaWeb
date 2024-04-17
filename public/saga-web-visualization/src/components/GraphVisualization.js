import React, { useEffect, useRef, useState } from "react";
import Neovis from "neovis.js/dist/neovis.js";

export default function GraphVisualization(props) {
    const { width, height, containerId, backgroundColor, neo4jUri, neo4jUser, neo4jPassword } = props

    const visRef = useRef()
    const [vis, setVis] = useState(null)
    const [cypherQuery, setCypherQuery] = useState("")

    const handleSubmit = () => {
        if (cypherQuery.length > 3) {
			vis.renderWithCypher(cypherQuery);
		} else {
			vis.reload();
		}
    }

    useEffect(() => {
        const config = {
            containerId: visRef.current.id,
            neo4j: {
                serverUrl: neo4jUri,
                serverUser: neo4jUser,
                serverPassword: neo4jPassword
            },
            visConfig: {
                nodes: {
                    shape: "circle"
                },
                edges: {
                    arrows: {
                        to: {enabled: true}
                    }
                },
                physics: {
                    barnesHut: {
                        theta: 2,
                        gravitationalConstant: -6000,
                        centralGravity: 0.3,
        
                        springLength: 10,
                        springConstant: 0.04,
                        damping: 0.8,
                        avoidOverlap: 1
                    },
                    solver: "barnesHut",
                    timestep: 0.15,
                    minVelocity: 0.01
                }
            },
            labels: {
                saga_chapter: {
                    label: "name"
                },
                saga: {
                    label: "name"
                }
            },
            relationships: {
                in_saga: {
                
                }
            },
            initialCypher: "MATCH (n)-[r:in_saga]->(m) RETURN n,r,m"
        };
        const vis = new Neovis(config);
        setVis(vis)
        vis.render();
    }, [neo4jUri, neo4jUser, neo4jPassword])

    return (
        <div className="App">
            <div id="container">
                <div
                    id={containerId}
                    ref={visRef}
                    style={{
                        width: `${width}`,
                        height: `${height}`,
                        backgroundColor: `${backgroundColor}`,
                    }}
                />
                <div id="overlay">
                <div id="neovis-control" className="h-48 bg-gray-200 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Saga Networks Visualizer</h1>
                        <br />
                            <label htmlFor="query" className="block text-sm font-medium text-gray-700">Neo4j Cypher Query</label>
                            <input
                                type="text"
                                id="query"
                                name="query"
                                value={undefined}
                                onChange={(e) => setCypherQuery(e.target.value)}
                                className="mt-1 bg-slate-200 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm rounded-md px-2 py-2"
                            />
                            <button
                                onClick={() => handleSubmit()}
                                className="mt-4 w-24 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-100 ease-in-out"
                            >
                            Submit
                            </button>
                        <br />
                        </div>
                        <div className="mt-auto">
                        <p className="text-xs">Department of Scandinavian</p>
                        <p className="text-xs">University of California, Berkeley</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}