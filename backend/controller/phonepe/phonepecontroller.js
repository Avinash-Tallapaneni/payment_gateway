const crypto = require("crypto");
const axios = require("axios");
require("dotenv").config();

const createNewPayment = async (req, res) => {
  const data = {
    merchantId: process.env.MERCHANT_ID,
    merchantUserId: req.body.merchantUserId,
    merchantTransactionId: req.body.transactionId,
    buyerName: req.body.buyerName,
    amount: req.body.amount,
    redirectUrl: `http://localhost:5173/api/status/${req.body.transactionId}`,
    redirectMode: "POST",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const payloadStringify = JSON.stringify(data);
  const payload = Buffer.from(payloadStringify).toString("base64");

  var hash = crypto.createHash("sha256");
  const SHA256 = hash
    .update(payload + process.env.PHONEPE_API_ENDPOINT + process.env.SALT_KEYS)
    .digest("hex");

  const checksum = SHA256 + "###" + process.env.SALT_KEYS_INDEX;

  const options = {
    url: process.env.PHONEPE_TEST_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
    },
    data: {
      request: payload,
    },
  };

  try {
    const response = await axios.post(options.url, options.data, {
      headers: options.headers,
    });

    const data = response.data.data.instrumentResponse.redirectInfo.url;
    return res.json({ statusCode: 200, redirectURL: data, message: "sucess" });
  } catch (error) {
    return res.json({ statusCode: 500, message: error.message });
  }
};

module.exports = {
  createNewPayment,
};
