const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("../movieappimages-firebase-adminsdk-sfnfw-393ad8f0e6.json");

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket(`gs://movieappimages.appspot.com`);
async function uploadFile(path, filename) {
  return storageRef.upload(path, {
    public: true,
    destination: `gs://movieappimages.appspot.com${filename}`,
    metadata: {
      firebaseStorageDownloadTokens: uuidv4(),
    },
  });
}
const uploadsImageIntoFirebase = async (req, res) => {
  try {
    await uploadFile(req.file.path, req.file.path);

    res.send("Good Work");
  } catch (e) {
    res.send(e.message);
  }
};

exports.uploadsImageIntoFirebase = uploadsImageIntoFirebase;
