const express = require('express');
const path = require('path');
const neo4j = require('neo4j-driver');

const app = express();
const port = 3000;

// // Neo4j connection details
// const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'moviedatabasecopy')); // pw: 12345678, moviedatabasecopy
// const session = driver.session();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'))
});

app.get('/visualization', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'visualization.html'))
});

app.get('/visualization', (req, res) => {
  res.render('visualization'); // Render the 'visualization' view
});

// // Define the /api/data route for fetching data from Neo4j
// app.get('/api/data', async (req, res) => {
//   try {
//     const result = await session.run('MATCH (n) RETURN n LIMIT 25');
//     const nodes = result.records.map(record => record.get('n').properties);
//     res.json(nodes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Close the Neo4j session when the server is stopped
process.on('exit', () => {
  session.close();
  driver.close();
  console.log('Neo4j session closed');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});