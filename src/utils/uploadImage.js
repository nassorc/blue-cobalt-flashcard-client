import Compressor from "compressorjs";
import { v4 as uuidv4 } from 'uuid';

import imageCompression from 'browser-image-compression';

export async function handleUploadImageEvent(upload, callback) {
    // Extract data 
    let file = upload[0];
    let fileExt = file.name.split('.').pop();         // get file extension
    let fileName = file.name.split(`.${fileExt}`)[0]  // get file name
    fileName = fileName.split(' ').join('');          // remove spaces
    let uniqueFileName = `${fileName}_id_${uuidv4()}.${fileExt}`
    // optimize quality
    new Compressor(file, {
        quality: 0.4,
        success(result) {
            const compressedQualityImageFile = new File([result], uniqueFileName, {type: 'image/jpeg'})
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 600,
                useWebWorker: true,
            }
            // optimize size
            imageCompression(compressedQualityImageFile, options)
            .then((compressedSizeImageFile) => {
                // create data url to display image after compression
                const url = URL.createObjectURL(compressedSizeImageFile);
                // package image as a file
                const finalImageFile = new File([compressedSizeImageFile], uniqueFileName,{type: 'image/jpeg'})

                let information = {
                    deckImageFile: finalImageFile,
                    deckImageName: uniqueFileName,
                    deckImage: url,
                }
                callback(information)
            })
            .catch(err => {
                throw new Error(err)
            })
        },
        error(err) {
            console.log(err.message)
        }
    })

}
