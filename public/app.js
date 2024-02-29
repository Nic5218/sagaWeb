// // This code is for trying out embedding neo4j in iframe (make sure to open and run database first)
// const express = require('express');
// const neo4j = require('neo4j-driver');

// const app = express();

// const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'moviedatabasecopy'));
// const session = driver.session();

// //neo4j-data
// app.get('/', async (req, res) => {
//     try {
//         const result = await session.run('MATCH (n) RETURN n LIMIT 10');
//         const data = result.records.map(record => record.get('n').properties);
//         res.json(data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });


//////// divider /////////

// this is the code for just the website

const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' folder
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/linktodb', (req, res) => {
    res.sendFile(path.join(__dirname, 'linktodb.html'));
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


