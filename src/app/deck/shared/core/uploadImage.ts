import { storage } from "../../../../shared/services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImage(imageName, imageFile) {
  const imageRef = ref(storage, `decks/${imageName}`);
  try {
    const snapshot = await uploadBytes(imageRef, imageFile);
    const imageURL = await getDownloadURL(snapshot.ref);
    return imageURL;
  } catch (err) {
    throw new Error(err.message);
  }
}
