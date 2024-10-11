import { sign, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express-serve-static-core";

/*
    generate jsonwebtoken
*/
export function generateToken(data: {datas: {}}, jwt_secret: string) {
  return sign(data, jwt_secret);
}
/*
    verifies jsonwebtoken
*/
export function verifyToken(token: string, jwt_secret: string) {
  return verify(token, jwt_secret);
}

//middleware
/*
  verifies the jsonwebtoken in middleware
*/
export function verifyJWToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers["authorization"]?.split(" ")[1]; // Assuming the token is in the format "Bearer <token>"

  if (!token) {
    res.status(403).send("A token is required for authentication");
    return;
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token to request object
  } catch (err) {
    res.status(401).send("Invalid Token");
    return;
  }
  next();
  return;
}
