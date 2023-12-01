const express = require("express");
const router = express.Router();
const {
  insertPromo,
  getAllPromos,
  getPromoByPromoCode,
  updatePromo,
  deletePromo,
} = require("./promoController");

//Admin
router.post("/", insertPromo);
router.get("/", getAllPromos);
router.get("/:promoCode", getPromoByPromoCode);
router.put("/:promoCode", updatePromo);
router.delete("/:promoCode", deletePromo);

module.exports = router;
