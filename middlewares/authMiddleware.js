import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
import "dotenv/config";

async function authMiddleware(req, res, next) {
  try {
    // const { tempToken } = req.cookies || req.body;
    const { tempToken } = req.body;
    // console.log(req.body);
    // return;

    if (!tempToken) return;

    const decoded_token = jwt.verify(tempToken, process.env.SECRET);

    const loggedInUser = await userModel.findById(decoded_token.userID);

    if (!loggedInUser) res.status(500).json({ message: "User not found" });

    req.user = loggedInUser;
    // console.log(req.user);
    next();
  } catch (err) {
    console.log(err);
  }
}

export default authMiddleware;
