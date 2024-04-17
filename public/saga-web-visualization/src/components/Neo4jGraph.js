import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Neovis from "neovis.js/dist/neovis.js";

export default function NeoGraph({ props }) {
    const { width, height, containerId, backgroundColor, neo4jUri, neo4jUser, neo4jPassword } = props

    const visRef = useRef()

    useEffect(() => {
        const config = {
            containerId: visRef.current.id,
            neo4j: {
                serverUrl: neo4jUri,
                serverUser: neo4jUser,
                serverPassword: neo4jPassword
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
        vis.render();
    }, [neo4jUri, neo4jUser, neo4jPassword])

    return (
        <div
            id={containerId}
            ref={visRef}
            style={{
                width: `${width}`,
                height: `${height}`,
                backgroundColor: `${backgroundColor}`,
            }}
        />
    )
}

NeoGraph.defaultProps = {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#d3d3d3",
};

NeoGraph.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    containerId: PropTypes.string.isRequired,
    neo4jUri: PropTypes.string.isRequired,
    neo4jUser: PropTypes.string.isRequired,
    neo4jPassword: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
};
