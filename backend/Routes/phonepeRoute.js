const express = require("express");

const { createNewPayment } = require("../controller/phonepe/phonepecontroller");

const router = express();

router.post("/payment", createNewPayment);

module.exports = router;
