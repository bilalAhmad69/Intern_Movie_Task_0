const firebaseAdmin = require("firebase-admin");
const Path = require("path");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("../movieappimages-8dd3c-firebase-adminsdk-7xxx6-8d6f42d2aa.json");
const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});
const storageRef = admin
  .storage()
  .bucket(`gs://movieappimages-8dd3c.appspot.com`);
async function uploadFile(path, filename) {
  return storageRef.upload(path, {
    public: true,
    destination: `uploads/images/${filename}`,
    metadata: {
      cacheControl: "max-age=31536000",
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
      },
    },
  });
}
module.exports = async (path, filename) => {
  try {
    const media = await uploadFile(path, filename);
    return await media[0].metadata.mediaLink;
  } catch (e) {
    return e.message;
  }
};
