const path = require('path');
const fs = require('fs');
const moment = require('moment');
const base64Img = require('base64-img');

upload  = async (file, uploadType) => {
    const type = file.type;
    const tmp = file.path;
    const extension = type.split('/')[1];
    const newfilename = + new Date() + `.${extension}`;
    const bucketPath =  `static/uploads/${uploadType === 'avatar' ? 'avatars' : 'galleries'}`;
    return new Promise((resolve, reject) => {
    fs.rename(tmp, path.join(process.cwd(),bucketPath,newfilename), (error) => {
        if(error){
            reject(error)
        } else {
            resolve(path.join(bucketPath,newfilename));
        }
      });
    })
};
uploadAvatar = async (base64) => {
    const bucketPath =  'static/uploads/avatars/';
    return new Promise((resolve, reject) => {
    base64Img.img(base64,bucketPath,moment().unix(), (error, filepath) => {
        if(error){
            reject(error)
        } else {
            const path = filepath.substring(filepath.split('/')[0].length);
            resolve(path);
        }
    })
    });
}

module.exports = { upload, uploadAvatar}; 
