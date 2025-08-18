import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
};
