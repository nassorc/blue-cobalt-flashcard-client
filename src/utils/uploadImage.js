import Compressor from "compressorjs";
export function handleUploadImageEvent(upload, setDeckImg) {
    let file = upload[0];
    console.log(file)
    new Compressor(file, {
        quality: 0.4,
        success(result) {
            console.log(result)
            const handleFile = (e) => {
                const blob = e.target.result;
                setDeckImg(blob)
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