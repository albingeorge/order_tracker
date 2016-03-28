var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// create a schema
var orderSchema = new Schema({
    id: ObjectId,
    order_id: { type: String, required: true, trim: true },
    sr_id: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    shipping_status: { type: String, trim: true },
    shipping_document_link: { type: String, trim: true },
    created_at: Date,
    updated_at: Date
});

orderSchema.pre('save', function(next) {
  console.log("Pre save");
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  if ( !this.shipping_status ) {
    this.shipping_status = "pending";
    this.shipping_document_link = "missing";
  }
  next();
});


var Expense = mongoose.model('Orders', orderSchema);

module.exports = Expense;