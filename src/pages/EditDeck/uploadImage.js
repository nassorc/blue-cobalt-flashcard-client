export default function handleUploadImageEvent(ev) {
    const inpImageFile = ev.target;
    let file = inpImageFile.files[0];
    let fileName = APP.file.name;
    let blob;
    if (APP.file.type.match(/image.*/)) {
        const reader = new FileReader();
        reader.readAsDataURL(APP.file);
        reader.addEventListener('load', (ev) => {
            blob = reader.result;
        });
    }
}