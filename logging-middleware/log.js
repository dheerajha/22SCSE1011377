  const axios = require("axios");
  require("dotenv").config();

  let token = null;

  async function authenticate() {
  try {
    const res = await axios.post("http://20.244.56.144/evaluation-service/auth", {
      email: process.env.EMAIL,
      name: process.env.NAME,
      rollNo: process.env.ROLL_NO,
      accessCode: process.env.ACCESS_CODE,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    });

    token = res.data["access_token"];
    console.log("Token received:", token);

  } catch (err) {
    console.error("AUTH ERROR (full):", err.response?.data || err.message || err);
    console.error("HTTP Status:", err.response?.status || "No status");
  }
}


  async function log(stack, level, pkg, message) {
    try {
      if (!token) await authenticate();

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

    } catch (err) {
      console.error("Log error:", err.response?.data || err.message);
    }
  }

  module.exports = log;
