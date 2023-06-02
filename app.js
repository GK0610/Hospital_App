const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Read the hospital data from the JSON file
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading hospitalData.json', err);
    return;
  }

  let hospitalData = JSON.parse(data);

  // GET request handler
  app.get('/', (req, res) => {
    res.json(hospitalData);
  });

  // POST request handler
  app.post('/', (req, res) => {
    const newHospital = req.body;
    hospitalData.push(newHospital);
    fs.writeFileSync('data.json', JSON.stringify(hospitalData));
    res.status(201).send('Hospital data added successfully');
  });

  // PUT request handler
  app.put('/update/:id', (req, res) => {
    const hospitalId = req.params.id;
    const updatedHospital = req.body;
    hospitalData[hospitalId] = updatedHospital;
    fs.writeFileSync('data.json', JSON.stringify(hospitalData));
    res.send('Hospital data updated successfully');
  });

  // DELETE request handler
  app.delete('/delete/:id', (req, res) => {
    const hospitalId = req.params.id;
    hospitalData.splice(hospitalId, 1);
    fs.writeFileSync('data.json', JSON.stringify(hospitalData));
    res.send('Hospital data deleted successfully');
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
});
