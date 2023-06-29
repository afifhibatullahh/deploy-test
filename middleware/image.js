const validationImage = (req, res) => {
  console.log(req.body);
  const image = req.file;
  const array_of_allowed_files = ["png", "jpg"];
  const allowed_file_size = 100;

  const file_extension = image.originalname.slice(
    ((image.originalname.lastIndexOf(".") - 1) >>> 0) + 2
  );

  if (!array_of_allowed_files.includes(file_extension)) {
    throw Error("Invalid file");
  }

  if (image.size / 1024 < allowed_file_size) {
    throw Error("File too large");
  }
  return next();
};

module.exports = validationImage;
