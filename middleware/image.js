const validationImage = (req, res, next) => {
  const image = req.files.image;
  const array_of_allowed_files = ["png", "jpg", "jpeg"];
  const allowed_file_size = 100;

  const file_extension = image.mimetype.split("/")[1].toLowerCase();

  if (!array_of_allowed_files.includes(file_extension)) {
    return res.status(403).send({ message: "Invalid File" });
  }

  if (image.size / 1024 > allowed_file_size) {
    return res.status(403).send({ message: "File too large" });
  }
  return next();
};

module.exports = validationImage;
