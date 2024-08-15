import firebaseApp from "@/config/firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadFileToFirebaseAndReturnUrl = async (file: File) => {
  try {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `media/${file.name}`);
    const uploadResponse = await uploadBytes(storageRef, file);

    const url = await getDownloadURL(uploadResponse.ref);
    return url;
  } catch (error) {
    throw error;
  }
};
