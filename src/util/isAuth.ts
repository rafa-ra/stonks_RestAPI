import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: string; // Add your custom property userId
}

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  const token: string = req.get("Authorization") || "";
  let decodedToken: JwtPayload;
  try {
    decodedToken = jwt.verify(token, "asd321") as JwtPayload;
  } catch (err) {
    return res.status(500).json({ message: "User not authenticated" });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  req.userId = decodedToken.userId;
  next();
};
