import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: string; // Add your custom property userId
}

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string = req.get("Authorization") || "";
  let loggedTokenString =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEyIiwidXNlcklkIjoyNSwiaWF0IjoxNzEzNzQyODI3LCJleHAiOjE3MTM3NDY0Mjd9.eGMU179KllivlaLXInmeb-vJNrFNK8N002kV15GpqaE";

  if (token.trim().startsWith("Bearer ")) {
    token = token.slice(7);
  }

  let decodedToken: JwtPayload;
  try {
    decodedToken = jwt.verify(token, "asd321") as JwtPayload;
  } catch (err) {
    console.log(err);

    return res.status(500).json({ message: "User not authenticated" });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  req.userId = decodedToken.userId;
  next();
};
