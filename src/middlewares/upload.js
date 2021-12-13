const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', 'uploads'),        
        filename: (req, file, callback) => {
            const { id } = req.params;
            const fileName = `${id}.jpeg`;
            
            return callback(null, fileName);
        },
    }),
};