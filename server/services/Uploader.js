const path = require('path');
const fs = require('fs');

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

module.exports = upload; 
