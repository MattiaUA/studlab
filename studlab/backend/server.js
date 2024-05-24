const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json()); // for parsing application/json

app.post('/updateDocs', (req, res) => {
    const newDoc = req.body;
    const docsPath = path.join(__dirname, '../../src/exampledata/Documents.json');

    fs.readFile(docsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        const allDocs = JSON.parse(data);
        allDocs.documentos.push(newDoc);

        fs.writeFile(docsPath, JSON.stringify(allDocs, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }

            res.send('Document updated successfully');
        });
    });
});

app.listen(3000, () => console.log('Server listening on port 3000'));