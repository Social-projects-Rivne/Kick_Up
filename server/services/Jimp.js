const Jimp = require('jimp');

 //crop img
 module.exports = async (file,width,height) => {
    const crop = await Jimp.read(file);
    crop
    .resize(width,height) //size
    .quality(80)          //quality
    .write(`static/uploads/avatars/small${+ new Date()}.${crop.getExtension()}`); //save
} 
