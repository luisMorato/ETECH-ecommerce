import Multer from 'multer';
import path from 'path';

const imageStorage = Multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "";

        if(req.url.includes('products')){
            folder = 'products'
        }else if(req.url.includes('user')){
            folder = 'user'
        }
        
        cb(null, `public/images/${folder}`)
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + Math.floor(Math.random() * 1000) + path.extname(file.originalname)
        cb(null, fileName)
    }
});

export const imageUpload: Multer.Multer = Multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        // if(!file.originalname.match('/\.(png|jpg)/')){
        //     return cb(new Error('Only JPG and PNG are Allowed'))
        // }
        cb(null, true)
    },
});


