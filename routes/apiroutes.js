// dependencies 
const path = require('path');
const fs = require('fs');

// routing
module.exports = (app) => {

  // GET /api/notes should read the db.json file and return all saved notes as JSON.
  app.get('/api/notes', (req, res) => {
    // Read the db.json file
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
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

  // POST /api/notes should receive a new note to save on the request body, 
  // add it to the db.json file, and then return the new note. 
  app.post('/api/notes', (req, res) => {
    // Read the db.json file
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading db.json:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      try {
        let notes = JSON.parse(data);

        // Create a new note
        const newNote = {
          id: generateUniqueId(notes), // Assuming you have a function to generate unique IDs
          title: req.body.title,
          text: req.body.text,
        };

        // Add the new note to the array of notes
        notes.push(newNote);

        // Write the updated notes array back to the db.json file
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (writeErr) => {
          if (writeErr) {
            console.error('Error writing db.json:', writeErr);
            return res.status(500).json({ error: 'Internal server error' });
          }
          // Return the newly created note
          res.json(newNote);
        });
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  });
};

// Function to generate unique IDs
function generateUniqueId(notes) {
  // Implementation of generating unique IDs
}