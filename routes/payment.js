// routes/payment.js
const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel"); // Your order model

// Route to handle payment verification callback from eSewa
router.post("/verify", async (req, res) => {
  const { status, amount, product_code, transaction_uuid } = req.body;

  // Check if the payment was successful
  if (status === "Success") {
    // Save the order to the database
    const order = new Order({
      productName: req.body.productName,  // You should pass the product name and other info here
      totalCost: amount,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      paymentStatus: "Paid",
    });

    try {
      await order.save();
      res.status(200).send("Order saved successfully!");
    } catch (error) {
      console.error("Error saving order:", error);
      res.status(500).send("Error saving order.");
    }
  } else {
    res.status(400).send("Payment failed");
  }
});

module.exports = router;
