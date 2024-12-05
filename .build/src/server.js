const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist', 'shopapp-angular')));

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'shopapp-angular', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

