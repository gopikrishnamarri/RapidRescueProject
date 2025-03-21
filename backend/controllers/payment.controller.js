const Payment = require('../models/payment.model');
const User = require('../models/user.model');

exports.processPayment = async (req, res) => {
  try {
    const { user_Id, serviceCharge, tax, totalAmount, paymentMethod } = req.body;

    // Validate required fields
    if (!user_Id || !serviceCharge || !tax || !totalAmount || !paymentMethod) {
      return res.status(400).send({ message: 'All fields are required', status: 400 });
    }

    // Validate payment method
    const validPaymentMethods = ['Credit Card/Debit Card', 'Google Pay', 'Cash'];
    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).send({ message: 'Invalid payment method', status: 400 });
    }

    // Check if the user exists
    const user = await User.findById(user_Id);
    if (!user) {
      return res.status(404).send({ message: 'User not found', status: 404 });
    }

    // Create the payment
    const newPayment = await Payment.create({
      user_Id,
      serviceCharge,
      tax,
      totalAmount,
      paymentMethod,
      paymentStatus: 'Completed' // Assuming payment is successful
    });

    return res.status(200).send({
      data: newPayment,
      message: 'Payment processed successfully',
      status: 200
    });
  } catch (error) {
    console.error("Error in processPayment:", error);
    return res.status(500).send({ message: error.message, status: 500 });
  }
};