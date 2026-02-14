const jwt = require("jsonwebtoken");
const { getSecretFromDB } = require("../utils/mockDb");

module.exports = async function (req, res, next) {
  
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const secret = await getSecretFromDB();
    const decoded = jwt.verify(token.replace("Bearer ", ""), secret);
    req.user = decoded;
    next();//middleware calling is needed to move to next step
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
