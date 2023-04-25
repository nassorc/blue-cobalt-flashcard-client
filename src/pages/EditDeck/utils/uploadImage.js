import Compressor from "compressorjs";
import { v4 as uuidv4 } from 'uuid'
export function handleUploadImageEvent(upload, setDeck) {
    // set deckImage
    let file = upload[0];
    let fileExt = file.name.split('.').pop();         // get file extension
    let fileName = file.name.split(`.${fileExt}`)[0]  // get file name
    fileName = fileName.split(' ').join('');          // remove spaces

    new Compressor(file, {
        quality: 0.2,
        success(result) {
            const handleFile = (e) => {
                const blob = e.target.result;
                // set deck name and image blob
                setDeck(prevState => {
                    return {
                        ...prevState,
                        deckImageName: `${fileName}_id_${uuidv4()}.${fileExt}`,
                        deckImage: blob
                    }
                })
            }
            if (file.type.match(/image.*/)) {
                const reader = new FileReader();
                reader.onloadend = handleFile;
                return reader.readAsDataURL(file);
            }
        },
        error(err) {
            console.log(err.message)
        }
    })
}