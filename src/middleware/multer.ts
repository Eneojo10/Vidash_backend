import multer from 'multer';
import path from 'path';
import fs from 'fs';


const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir); 
}

// Set storage options for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); 
    },
});

// Create the upload middleware
const upload = multer({ storage });

// Export the upload middleware so it can be used in the routes
export default upload;
