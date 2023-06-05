import { NextFunction, Request, Response } from "express";
//Middleware for authorizing requests

import jwt from "jsonwebtoken";
const jwtPrivateKey: string = "process.env.TOKEN_SECRET";

export default (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.header("Authorization");
  if (!bearerHeader)
    return res.status(401).send("Access Denied. No token provided.");
  const bearer = bearerHeader.split(" ");
  const token = bearer[1];
  if (!token) return res.status(401).send("Access Denied. No token provided.");

  try {
    // using jwt.verify to verify if it is a valid token
    const decoded = jwt.verify(token, jwtPrivateKey);

    // returns the value of the jwt if the token is verified
    req.user = decoded;
    next();
  } catch (err) {
    next({
      statusCode: 403,
      customMessage: "Invalid token",
    });
  }
};
