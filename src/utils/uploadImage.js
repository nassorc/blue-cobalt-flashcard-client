export function handleUploadImageEvent(upload, setDeckImg) {
    let file = upload[0];
    const handleFile = (e) => {
        const blob = e.target.result;
        setDeckImg(blob)
    }
    if (file.type.match(/image.*/)) {
        const reader = new FileReader();
        reader.onloadend = handleFile;
        reader.readAsDataURL(file);
    }
}