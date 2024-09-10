const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve("uploads")); // Diretório onde os arquivos serão armazenados
    },
    filename: (req, file, callback) => {
        const time = new Date().getTime();

        callback(null, `${time}_${file.originalname}`); // Nome do arquivo
    }
});

module.exports = storage;
