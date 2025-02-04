// controllers/orderController.js
const Order = require('../models/orderModel');

// Controller to create a new order
exports.createOrder = async (req, res) => {
    console.log('Payment data:', req.body); // Log the incoming data to see what eSewa is sending

  const { status, transaction_uuid, total_amount, product_id } = req.body; // Assuming you're passing product _id

  // Check if the payment status is 'Success' and handle accordingly
  if (status === 'Success') {
    // Fetch the product details based on the _id (not product_code)
    const product = await Product.findById(product_id); // Use _id for fetching product
    
    if (product) {
      // Create a new order in the database
      const order = new Order({
        productName: product.productName,
        totalCost: total_amount,
        transaction_uuid: transaction_uuid,
        status: 'Paid',
      });

      try {
        // Save the order to the database
        await order.save();
        res.status(200).send('Payment successful and order saved!');
      } catch (err) {
        console.error('Error saving order:', err);
        res.status(500).send('Error saving order.');
      }
    } else {
      res.status(400).send('Invalid product id');
    }
  } else {
    res.status(400).send('Payment failed');
  }


}
// Controller to get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};
