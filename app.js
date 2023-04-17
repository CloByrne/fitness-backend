const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Import the CORS middleware

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the home page
//app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, 'public', 'index.html'));
//});

app.get('/', (req, res) => {
    const homePage = `
      <html>
        <head>
          <title>Home</title>
        </head>
        <body>
          <div id="root"></div>
          <script src="/static/js/bundle.js"></script>
        </body>
      </html>
    `;
    res.send(aboutPage);
  });

// Serve the fitness page
app.get('/Fitness', (req, res) => {
    const fitnessPage = `
      <html>
        <head>
          <title>Fitness</title>
        </head>
        <body>
          <div id="root"></div>
          <script src="/static/js/bundle.js"></script>
        </body>
      </html>
    `;
    res.send(aboutPage);
  });

// Serve the about page
app.get('/About', (req, res) => {
    const aboutPage = `
      <html>
        <head>
          <title>About</title>
        </head>
        <body>
          <div id="root"></div>
          <script src="/static/js/bundle.js"></script>
        </body>
      </html>
    `;
    res.send(aboutPage);
  });

// Serve the health page
app.get('/Health', (req, res) => {
    const healthPage = `
      <html>
        <head>
          <title>Health</title>
        </head>
        <body>
          <div id="root"></div>
          <script src="/static/js/bundle.js"></script>
        </body>
      </html>
    `;
    res.send(healthPage);
  });

// Serve the contact page
app.get('/Contact', (req, res) => {
    const contactPage = `
      <html>
        <head>
          <title>Contact</title>
        </head>
        <body>
          <div id="root"></div>
          <script src="/static/js/bundle.js"></script>
        </body>
      </html>
    `;
    res.send(aboutPage);
  });

// Handle form submission
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Open a connection to the SQLite database
  const db = new sqlite3.Database(path.join(__dirname, 'database.db'));

  // Insert the form data into the contacts table
  db.run(
    'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    (error) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );

  // Close the database connection
  db.close();
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
