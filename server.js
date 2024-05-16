const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, 'db.json');

// Middleware to parse JSON bodies
app.use(express.json());

// Routes for serving HTML files
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes for API

// GET /api/notes - Read db.json and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    try {
      const notes = JSON.parse(data);
      res.json(notes);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// POST /api/notes - Receive a new note, add it to db.json, and return the new note
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    try {
      const notes = JSON.parse(data);
      newNote.id = generateUniqueId(notes);
      notes.push(newNote);
      fs.writeFile(dbPath, JSON.stringify(notes), (writeErr) => {
        if (writeErr) {
          console.error('Error writing db.json:', writeErr);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(newNote);
      });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Function to generate unique IDs
function generateUniqueId(notes) {
 
}