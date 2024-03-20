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

// const express = require('express');
// const path = require('path');
// const app = express();

// // Serve static files from the 'public' folder
// app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, 'about.html'));
// });

// app.get('/linktodb', (req, res) => {
//     res.sendFile(path.join(__dirname, 'linktodb.html'));
// });



// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

///////// divider //////////


// Google Sheet API
const express = require('express');
const { google } = require('googleapis');
const path = require('path');

const app = express();
const port = 3000;

// const credentials = require('/Users/qianni/Documents/sagaWeb/public/saga-network-0876b0c0bb51.json');

// Define the absolute path to your Google Sheets API credentials file
const credentialsPath = path.join(__dirname, 'saga-network-0876b0c0bb51.json');
// Load the service account credentials from the JSON file
const credentials = require(credentialsPath);


const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/linktodb', (req, res) => {
    res.sendFile(path.join(__dirname, 'linktodb.html'));
});

// Define a route to handle search requests
app.get('/search', async (req, res) => {
    const { query } = req.query; // Get the search query from the request

    try {
        // Fetch data from the Google Sheets document
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: 'YOUR_SPREADSHEET_ID',
            range: 'Sheet1', // Update with your sheet name
        });

        // Extract rows of data from the API response
        const rows = response.data.values;

        // Perform search
        const searchData = rows.filter(row => {
            // Customize the search logic based on your sheet's structure
            // For example, search in a specific column (e.g., column A)
            return row[0].toLowerCase().includes(query.toLowerCase());
        });

        // Return the search results as JSON
        res.json(searchData);
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from Google Sheets.' });
    }
});

// app.get('/linktodb', async (req, res) => {
//     const spreadsheetId = '1kX0QzxGIgJ9NEUzNIXuEyfPQ63Xmsu3xdcB5L9GnJ3E'; //Njals_networks
//     // full url: https://docs.google.com/spreadsheets/d/1kX0QzxGIgJ9NEUzNIXuEyfPQ63Xmsu3xdcB5L9GnJ3E/edit#gid=1044464888
//     const range = 'Sheet1!A1:D730'; // TODO: Update with your actual sheet name and range

//     try {
//         const response = await sheets.spreadsheets.values.get({
//             spreadsheetId,
//             range,
//         });

//         const rows = response.data.values;
//         res.json(rows);
//     } catch (error) {
//         console.error('The API returned an error:', error);
//         res.status(500).json({ error: 'An error occurred while fetching data from Google Sheets.' });
//     }
// });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});