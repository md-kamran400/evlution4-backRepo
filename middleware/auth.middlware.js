const jwt = require("jsonwebtoken");
const { blackListModel } = require("../models/blackList.model");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]||null

  try {
    let existingToken = await blackListModel.findOne({
      blackList: { $in: token },
    });
    if (existingToken) {
      res.status(200).json("Please Login!");
    } else {
      const decoded = jwt.verify(token, "Kamran");
      req.body.userId = decoded.userId;
      return next();
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = auth;
