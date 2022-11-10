const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const multer  = require('multer')

const upload = multer({ dest: 'uploads/' })

const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/upload-single-file', upload.single(), function (req, res, next) {
    console.log(req.file);
})

app.post('/upload-multiple-file', upload.array(), function (req, res, next) {
    console.log(req.files);
})

app.listen(port, () => {
    console.log(`Multer Example app listening on port ${port}`)
});