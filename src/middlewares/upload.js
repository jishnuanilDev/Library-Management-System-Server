const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'books', 
    allowedFormats: ['jpeg', 'png', 'jpg']
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
