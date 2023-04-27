import Compressor from "compressorjs";
import { v4 as uuidv4 } from 'uuid'
export function handleUploadImageEvent(upload, callback) {
    // set deckImage
    let file = upload[0];
    let fileExt = file.name.split('.').pop();         // get file extension
    let fileName = file.name.split(`.${fileExt}`)[0]  // get file name
    fileName = fileName.split(' ').join('');          // remove spaces

    let blob;
    let a = new Compressor(file, {
        quality: 0.4,
        success() {
            const handleFile = (e) => {
                blob = e.target.result;
                let information = {
                    deckImageName: `${fileName}_id_${uuidv4()}.${fileExt}`,
                    deckImage: blob,
                }
                callback(information)
            }
            if (file.type.match(/image.*/)) {
                const reader = new FileReader();
                reader.onloadend = handleFile;
                reader.readAsDataURL(file);

            }
        },
        error(err) {
            console.log(err.message)
        }
    })

}