const express = require('express');
const multer = require('multer');
const storage = require('../config/multer');

const router = express.Router();

const upload = multer({ storage: storage });


router.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    return res.json({ filename: req.file.filename });
});


module.exports = router;
