const jwt = require("jsonwebtoken");

const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token, unauthorized" });

  try {
    const decoded = jwt.verify(token, "sss"); // Use same secret
    req.admin = decoded; // Attach decoded admin info to request
    next();
  } catch (err) {
    console.error("Admin token verification failed:", err);
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = verifyAdminToken;
