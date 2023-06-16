const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultapload = path.join(avatarsDir, filename);
  Jimp.read(tempUpload)
    .then((image) => {
      return image.resize(250, 250).write(resultapload);
    })
    .catch((err) => {
      console.log("Error resizing image: ", err);
      throw err;
    });
  await fs.unlink(tempUpload);
  const avatarUrl = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.status(200).json({
    avatarUrl,
  });
};

module.exports = updateAvatar;
