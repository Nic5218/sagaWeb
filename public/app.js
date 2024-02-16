// const express = require('express');

// const neo4j = require('neo4j-driver');
// const _driver = neo4j.driver;

// const auth = neo4j.auth;

// // const d3 = require('d3');
// // import * as d3 from 'd3';
// // Define an async function for importing D3.js
// async function importD3() {
//   try {
//     const d3Module = await import('d3');
//     return d3Module.default || d3Module; // Handle default exports if applicable
//   } catch (e) {
//     // Handle the error, if needed
//     console.error('Failed to import D3.js:', e.message);
//     return null;
//   }
// }

// const app = express();

// // // Replace with your Neo4j connection details
// // const driver = _driver('bolt://localhost:7687', auth.basic('neo4j', 'moviedatabasecopy'));

// // Neo4j connection details
// const neo4jConfig = {
//   uri: 'bolt://localhost:7687',
//   user: 'neo4j',
//   password: 'moviedatabasecopy',
// };

// // Neo4j driver setup
// // const driver = __driver(neo4jConfig.uri, _auth.basic(neo4jConfig.user, neo4jConfig.password));
// // const driver = _driver(neo4jConfig.uri, auth.basic(neo4jConfig.user, neo4jConfig.password));
// const driver = neo4j.driver(neo4jConfig.uri, neo4j.auth.basic(neo4jConfig.user, neo4jConfig.password));


// // Define a route for displaying Neo4j data and handling actor queries
// app.get('/', async (req, res) => {
//   const session = driver.session();

//   try {
//     // Fetch nodes and relationships from Neo4j
//     const result = await session.run('MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 50');
//     const nodes = result.records.map(record => record.get('n').properties);
//     const relationships = result.records.map(record => record.get('r').properties);

//     res.send(renderGraph(nodes, relationships));
//   } catch (error) {
//     console.error('Error fetching Neo4j data:', error.message);
//     res.status(500).send('Internal Server Error');
//   } finally {
//     await session.close();
//   }
// });

// // Route for handling actor queries
// app.get('/actors', async (req, res) => {
//   const session = driver.session();
//   const selectedMovie = req.query.movie;

//   try {
//     // Query actors for the selected movie
//     const result = await session.run(
//       'MATCH (m:Movie {title: $title})<-[:ACTED_IN]-(a:Actor) RETURN a',
//       { title: selectedMovie }
//     );

//     const actors = result.records.map(record => record.get('a').properties);
//     res.json(actors);
//   } catch (error) {
//     console.error('Error fetching actors:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   } finally {
//     await session.close();
//   }
// });




// // Function to render a force-directed graph using D3.js
// function renderGraph(nodes, relationships) {
//   if (!nodes || !relationships) {
//     return '<p>No data to display.</p>';
//   }

//   const movieOptions = nodes
//     .filter(node => node.labels && node.labels.includes('Movie') && node.properties && node.properties.title)
//     .map(movie => `<option value="${movie.properties.title}">${movie.properties.title}</option>`)
//     .join('');

//   const html = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <title>Neo4j Movie Query</title>
//         <script src="https://d3js.org/d3.v5.min.js"></script>
//     </head>
//     <body>
//         <!-- Your D3.js graph container -->
//         <div id="graph-container"></div>

//         <!-- Movie selection dropdown -->
//         <label for="movie-select">Select a Movie:</label>
//         <select id="movie-select">
//             ${movieOptions}
//         </select>

//         <button onclick="queryActors()">Get Actors</button>

//         <script>
//             const width = 800;
//             const height = 600;

//             const svg = d3.select("#graph-container")
//                 .append("svg")
//                 .attr("width", ${width})
//                 .attr("height", ${height});

//             const simulation = d3.forceSimulation()
//                 .force("link", d3.forceLink().id(d => d.id))
//                 .force("charge", d3.forceManyBody())
//                 .force("center", d3.forceCenter(${width} / 2, ${height} / 2));

//             const link = svg.selectAll("line")
//                 .data(${JSON.stringify(relationships)})
//                 .enter().append("line");

//             const node = svg.selectAll("circle")
//                 .data(${JSON.stringify(nodes.filter(node => node.labels && node.labels.includes('Person') && node.properties && node.properties.name))})
//                 .enter().append("circle")
//                 .attr("r", 10)
//                 .attr("fill", "blue");

//             simulation.nodes(${JSON.stringify(nodes)}).on("tick", ticked);
//             simulation.force("link").links(${JSON.stringify(relationships)});

//             function ticked() {
//                 link.attr("x1", d => d.source.x)
//                     .attr("y1", d => d.source.y)
//                     .attr("x2", d => d.target.x)
//                     .attr("y2", d => d.target.y);

//                 node.attr("cx", d => d.x)
//                     .attr("cy", d => d.y);
//             }

//             // Function to handle the query
//             function queryActors() {
//                 const selectedMovie = document.getElementById("movie-select").value;
//                 fetch(\`/actors?movie=\${encodeURIComponent(selectedMovie)}\`)
//                     .then(response => response.json())
//                     .then(data => console.log(data))
//                     .catch(error => console.error('Error fetching actors:', error));
//             }
//         </script>
//     </body>
//     </html>
//   `;

//   return html;
// }




// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });



const express = require('express');
const neo4j = require('neo4j-driver');

const app = express();

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'moviedatabasecopy'));
const session = driver.session();

//neo4j-data
app.get('/', async (req, res) => {
    try {
        const result = await session.run('MATCH (n) RETURN n LIMIT 10');
        const data = result.records.map(record => record.get('n').properties);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



//** get testing **//
// app.get('/', (req, res) => {
//   res.send('Hello, this is the root path!');
// });

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
