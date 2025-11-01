const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getAllCarts);               // GET all carts
router.get("/user/:user_id", cartController.getCartByUserId); // GET carts for specific user
router.post("/", cartController.addCart);                  // POST add cart item
router.delete("/:id", cartController.deleteCart);         // DELETE cart item

module.exports = router;
