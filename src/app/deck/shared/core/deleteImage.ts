import { storage } from "../../../../shared/services/firebase";
import { ref, deleteObject } from "firebase/storage";
export async function deleteImage(imageName) {
  const deleteImageRef = ref(storage, `decks/${imageName}`);
  try {
    await deleteObject(deleteImageRef);
  } catch (err) {
    throw new Error(err.message);
  }
}
