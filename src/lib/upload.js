import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "./firebase.js";

const upload = async (file) => {
  // Optional: Define any custom metadata
  const metadata = {
    contentType: file.type,
    // Add any other metadata here
  };

  const date = new Date();

  const storageRef = ref(storage, `images/${date + file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata); // resumable file upload including metadata with high control

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        switch (error.code) {
          case "storage/unauthorized":
            reject(
              new Error("User doesn't have permission to access the object")
            );
            break;
          case "storage/canceled":
            reject(new Error("User canceled the upload"));
            break;
          case "storage/unknown":
            reject(
              new Error("Unknown error occurred, inspect error.serverResponse")
            );
            break;
          default:
            reject(error);
        }
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export default upload;
