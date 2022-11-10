const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const path = require('path');

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/upload-single-file', upload.single('image'), function (req, res, next) {
    console.log(req.file);
})

app.post('/upload-multiple-file', upload.array('images'), function (req, res, next) {
    console.log(req.files);
})

app.listen(port, () => {
    console.log(`Multer Example app listening on port ${port}`)
});