const JWT = require("jsonwebtoken");
const userModel = require("../model/user");
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET; // Make sure this matches the secret used to sign the token

const decodeToken = (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing or invalid" });
    }

    // Extract the token part after "Bearer "
    const token = authHeader.split(" ")[1];

    // Verify and decode the token
    const decoded = JWT.verify(token, JWT_SECRET);

    // Attach decoded information to req.user
    req.user = decoded; // Attach all fields from token to req.user

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;

    next();
  } catch (error) {
    console.log(error);
  }
};
//admin acceess
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (
      user.Organization !== "Admin" ||
      user.Organization !== "Department" ||
      user.Organization !== "User"
    ) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: error,
    });
  }
};
module.exports = {
  requireSignIn,
  isAdmin,
  decodeToken,
};
