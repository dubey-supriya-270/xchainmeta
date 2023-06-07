// Importing  jwt
import jwt from "jsonwebtoken";

// function to generate token
const generateAccessToken = (userEmail: string, _id: string) => {
  return jwt.sign(
    {
      userEmail,
      userId: _id,
    },
    "process.env.TOKEN_SECRET",
    {
      expiresIn: "20h",
    }
  );
};

export default {
  generateAccessToken,
};
