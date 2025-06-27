const axios = require("axios");
require("dotenv").config();

let token = null;
let isAuthenticating = false;

async function authenticate() {
  if (token || isAuthenticating) return;
  isAuthenticating = true;

  try {
    const res = await axios.post("http://20.244.56.144/evaluation-service/auth", {
      email: process.env.EMAIL,
      name: process.env.NAME,
      rollNo: process.env.ROLL_NO,
      accessCode: process.env.ACCESS_CODE,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    });

    token = res.data["access token"] || res.data["access_token"];
    console.log("Token received:", token);

  } catch (err) {
    console.error("AUTH ERROR:", err.response?.data || err.message || err);
    console.error("HTTP Status:", err.response?.status || "No status");
  } finally {
    isAuthenticating = false;
  }
}

async function log(stack, level, pkg, message) {
  try {
    if (!token) await authenticate();
    if (!token) {
      console.warn("Token not available after authentication, skipping log.");
      return;
    }

    const res = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("Log sent:", res.data.message || "Success");

  } catch (err) {
    console.error("Log error:", err.response?.data || err.message);
  }
}

module.exports = log;
