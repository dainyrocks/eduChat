const { s3 } = require("../Config/awsConfig");
const multer = require("multer");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

const storage = multer.memoryStorage();
const upload = multer({ storage }).array("files", 10);

const getFormattedDate = () => new Date().toISOString().split("T")[0];
const uploadImage = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) return res.status(500).json({ error: err.message });

      const { username, enrollmentNo } = req.body;
      if (!username || !enrollmentNo)
        return res
          .status(400)
          .json({ error: "Username and Enrollment No. required" });

      const userFolder = `${username}${enrollmentNo}/`;
      const dateFolder = `${userFolder}${getFormattedDate()}/`;

      const imageUrls = [];

      for (const file of req.files) {
        const fileName = `${dateFolder}${Date.now()}-${file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        await s3.send(new PutObjectCommand(uploadParams));
        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        imageUrls.push(fileUrl);
      }
      res.json({ message: "Images uploaded successfully!", imageUrls });
    });
  } catch (error) {
    res.status(500).json({ error: "Upload failed", details: error });
  }
};

module.exports = { uploadImage };
