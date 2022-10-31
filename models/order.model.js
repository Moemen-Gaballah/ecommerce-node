const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/ecommerce";

const orderSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    status: String,
    address: String,
    timestamp: Number
});

const OrderItem = mongoose.model("order", orderSchema);

exports.addNewItem = data => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                let item = new OrderItem(data)
                return item.save();
            }).then(() => {
                mongoose.disconnect();
                resolve();
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

exports.getItemsByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                return OrderItem.find({user: userId}, {}, {sort: {timestamp: 1}})
            }).then((items) => {
                mongoose.disconnect();
                resolve(items);
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    })
}
