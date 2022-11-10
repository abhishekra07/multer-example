const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.originalname + '-' + uniqueSuffix)
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

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