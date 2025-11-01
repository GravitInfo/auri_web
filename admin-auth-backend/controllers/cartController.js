const Cart = require("../models/cartModel");

// GET all cart records
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.getAll();
    res.json(carts);
  } catch (err) {
    console.error("❌ Error fetching cart data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET cart by user_id
exports.getCartByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const carts = await Cart.getByUserId(user_id);

    if (!carts || carts.length === 0) {
      return res.status(404).json({ error: "No cart items found for this user" });
    }

    res.json(carts);
  } catch (err) {
    console.error("❌ Error fetching user's cart:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST - Add a new cart record
exports.addCart = async (req, res) => {
  try {
    const { user_id, org_sid, p_date, p_time, amt } = req.body;

    if (!user_id || !org_sid) {
      return res.status(400).json({
        error: "user_id and org_sid are required",
      });
    }

    const result = await Cart.create({
      user_id,
      org_sid,
      p_date,
      p_time,
      amt,
    });

    res.status(201).json({
      message: "Cart item added successfully",
      cart_id: result.insertId,
    });
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add cart item" });
  }
};

// DELETE - Remove a cart record by ID
exports.deleteCart = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Cart.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json({ message: "Cart item deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting cart:", err);
    res.status(500).json({ error: "Failed to delete cart item" });
  }
};
