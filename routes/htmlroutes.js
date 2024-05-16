// dependencies
const path = require("path");

// routing
module.exports = (app) => {
  // creating routes
  // Serve notes.html
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // Serve index.html for all other routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};