import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Stripe from "stripe";

// Place order COD: /api/order/place
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;
    if (!address || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid order details", success: false });
    }
    // calculate amount using items;
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Add tex charfe 2%
    amount += Math.floor((amount * 2) / 100);
    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
    });
    res
      .status(201)
      .json({ message: "Order placed successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// oredr details for individual user :/api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all orders for admin :/api/order/all
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// update order status by seller :/api/order/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    
    // Validate status
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }
    
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("items.product address");
    
    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    
    res.status(200).json({ success: true, order: updatedOrder, message: `Order ${status}` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// get orders for seller :/api/order/seller
export const getSellerOrders = async (req, res) => {
  try {
    // Find all orders and populate with product details
    const orders = await Order.find({})
      .populate("items.product address")
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// create payment intent for online payment :/api/order/create-payment-intent
export const createPaymentIntent = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.user;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }
    
    if (!address) {
      return res.status(400).json({ success: false, message: "Address is required" });
    }
    
    // Calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product ${item.product} not found` });
      }
      if (product.offerPrice) {
        amount += product.offerPrice * item.quantity;
      } else {
        amount += product.price * item.quantity;
      }
    }
    
    // Add tax (2%)
    const tax = Math.floor((amount * 2) / 100);
    amount += tax;
    
    // Create a temporary order to save in DB with pending status
    const tempOrder = await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "Online",
      isPaid: false,
      status: "pending"
    });
    
    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    // Create the line items for Stripe
    const lineItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (product) {
        lineItems.push({
          price_data: {
            currency: 'inr',
            product_data: {
              name: product.name,
            },
            unit_amount: Math.round((product.offerPrice || product.price) * 100), // Convert to cents
          },
          quantity: item.quantity,
        });
      }
    }
    
    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/my-orders?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        orderId: tempOrder._id.toString(),
      },
    });
    
    res.status(200).json({ 
      success: true, 
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
