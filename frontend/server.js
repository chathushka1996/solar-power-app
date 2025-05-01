const express = require('express');
const path = require('path');
const app = express();
const port = 2999;

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle all other routes by serving index.html (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});