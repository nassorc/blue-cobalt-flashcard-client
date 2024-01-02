import { useEffect, useState } from "react";
import FirebaseApp, {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "@/lib/firebase";

export default function useUploadImage() {
  const [loading, setLoading] = useState<boolean | undefined>();
  const [error, setError] = useState<string | undefined>();
  useEffect(() => {}, [loading]);
  const upload = async (file: File, path: string) => {
    setLoading((prev) => true);
    const imageRef = ref(storage, path);
    const snapshot = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    setLoading((prev) => false);
    return url;
  };
  const remove = async (path: string) => {
    setLoading((prev) => true);
    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
    setLoading((prev) => false);
  };
  return { upload, remove, loading, setLoading, error, setError };
}
