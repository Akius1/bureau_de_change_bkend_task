const express = require("express");
const { checkToken } = require("./auth");
const jwt = require("jsonwebtoken");

async function authorization(req, res, next) {
  try {
    const secret = process.env.secret_id;
    const header = req.headers["authorization"];
    const token = checkToken(header);
    jwt.verify(token, secret, (err, authorizedData) => {
      if (err) {
        //If error send Forbidden (403)
        console.log("ERROR: Could not connect to the protected route");
        res.sendStatus(403);
      } else {
        //If token is successfully verified, we can send the autorized data

        console.log("SUCCESS: Connected to protected route");
        req.user = authorizedData;
        next();
      }
    });
  } catch (error) {
    res.status(400).json({
      data: {
        result: "",
        error: error,
      },
    });
  }
}

module.exports = authorization;
