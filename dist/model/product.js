"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ProductSchema = new Schema({
  productName: String,
  time: { type: Date, default: Date.now },
  college: { type: Schema.Types.ObjectId },
  city: { type: Schema.Types.ObjectId },
  pageView: { type: Number, default: 0 },
  wishList: { type: String },
  userName: { type: String },
  productDescription: { type: String, default: "N/A" },
  lastEdit: { type: Date, default: Date.now },
  ratings: { type: Number, default: 0 },
  numberOfRatings: { type: Number, default: 0 },
  daysGap: { type: Number, default: 0 },
  condition: { type: Number, default: 0 },
  isAvailable: { type: Number, default: 0 },
  nextAvailable: { type: Number, default: 0 },
  rentPerAmount: { type: Number, default: 0 },
  securityAmount: { type: Number, default: 0 },
  isSecurityAmount: { type: Number, default: 0 },
  facebookLink: { type: String, default: "N/A" },
  youtubeLink: { type: String, default: "N/A" },
  twitterLink: { type: String, default: "N/A" },
  referenceLink: { type: String, default: "N/A" },
  category: { type: Schema.Types.ObjectId },
  subcategory: { type: Schema.Types.ObjectId },
  image1: { type: String, default: "noimagefound" },
  image2: { type: String, default: "noimagefound" },
  image3: { type: String, default: "noimagefound" },
  image4: { type: String, default: "noimagefound" },
  popularity: { type: Number, default: 100 },
  productAge: { type: Number, default: 0 },
  userId: { type: Schema.Types.ObjectId },
  brand: { type: String, default: "N/A" },
  rentTimeType: { type: Number, default: 0 },
  productApproved: { type: Number, default: 0 },
  linkApproved: { type: Number, default: 0 },
  imageApproved: { type: Number, default: 0 },
  onHold: { type: Number, default: 0 },
  subCategory: { type: Schema.Types.ObjectId },
  subcategoryName: { type: String },
  categoryName: { type: String }

});

module.exports = _mongoose2.default.model('product', ProductSchema);
//# sourceMappingURL=product.js.map