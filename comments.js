// Create web server with Express.js
// Load comments from JSON file
// Add new comments to JSON file
// Render comments in HTML

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Load comments from JSON file
const loadComments = () => {
  const data = fs.readFileSync('comments.json');
  return JSON.parse(data);
};

// Add new comments to JSON file
const saveComments = (comments) => {
  fs.writeFileSync('comments.json', JSON.stringify(comments));
};

// Render comments in HTML
const renderComments = (comments) => {
  let html = '';
  comments.forEach((comment) => {
    html += `<div>${comment.name}: ${comment.message}</div>`;
  });
  return html;
};

// Configure Express.js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET /comments
app.get('/comments', (req, res) => {
  const comments = loadComments();
  const html = renderComments(comments);
  res.send(html);
});

// POST /comments
app.post('/comments', (req, res) => {
  const comments = loadComments();
  comments.push(req.body);
  saveComments(comments);
  res.redirect('/comments');
});

// Start web server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

