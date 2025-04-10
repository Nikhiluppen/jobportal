const express = require('express');
const multer = require('multer');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');

const app = express();
const port = 5000;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp as the file name
  },
});

const upload = multer({ storage });

// Make sure the `uploads` folder exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Endpoint to handle Excel file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(__dirname, 'uploads', req.file.filename);

  // Read and parse the Excel file using xlsx
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetNames = workbook.SheetNames;
    const sheet = workbook.Sheets[sheetNames[0]]; // Get the first sheet
    const jsonData = XLSX.utils.sheet_to_json(sheet); // Convert sheet to JSON

    // Log the parsed data (you can now process or store it as needed)
    console.log(jsonData);

    // Send the parsed data as a response
    res.json({ message: 'File uploaded successfully!', data: jsonData });
  } catch (error) {
    console.error('Error parsing Excel file:', error);
    res.status(500).send('Error processing Excel file.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
