var mongoose = require('mongoose');

var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;

// create a schema
var OrderSchema = new Schema({
    // id: ObjectId,
    order_id: { type: String, required: true, trim: true },
    sr_id: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    shipping_status: { type: String, trim: true },
    shipping_document_link: { type: String, trim: true },
    created_at: { type: Date, default: new Date() },
    updated_at: Date
});

OrderSchema.pre('save', function(next) {
  this.updated_at = new Date();
  if ( !this.shipping_status ) {
    this.shipping_status = "pending";
    this.shipping_document_link = "missing";
  }
  next();
});

var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;