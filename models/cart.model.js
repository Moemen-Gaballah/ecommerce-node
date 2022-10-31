const mongoose = require("mongoose");

const DB_URL = 'mongodb://localhost:27017/ecommerce';

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number
});

const CartItem = mongoose.model("cart", cartSchema);

exports.addNewItem = data => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(()=> {
                let item = new CartItem(data);
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
                return CartItem.find({userId: userId}, {}, {sort: {timestamp: 1}})
            })
            .then((items) => {
                mongoose.disconnect();
                resolve(items);
            }).catch(err => {
                mongoose.disconnect();
                reject(err);
        });
    })
}

exports.editItem = (id, newData) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return CartItem.updateOne({_id: id}, newData)
                // console.log(CartItem.updateOne({_id: id}, newData))
            }).then(items => {
                mongoose.disconnect();
                resolve(items);
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

exports.deleteItem = id => {
    return new Promise((resolve, reject) => {
       mongoose
           .connect(DB_URL)
           .then(() => {
            // CartItem.deleteOne({_id: id})
            return CartItem.findOneAndDelete( id)
           }).then(() => {
               mongoose.disconnect();
               resolve();
       }).catch(err => {
          mongoose.disconnect();
          reject(err);
       });
    });
}

exports.deleteAll= userId => {
    return new Promise((resolve, reject) => {
       mongoose
           .connect(DB_URL)
           .then(() => {
            // CartItem.deleteOne({_id: id})
            return CartItem.deleteMany({userId: userId})
           }).then(() => {
               mongoose.disconnect();
               resolve();
       }).catch(err => {
          mongoose.disconnect();
          reject(err);
       });
    });
}


exports.productExistCart = (productId, userId) => {
    return new Promise((resolve, reject) => {
       mongoose.connect(DB_URL)
           .then(() => {
               return CartItem.findOne({userId: userId, productId: productId})
           }
        ).then((cartItem) => {
            mongoose.disconnect();
            resolve(cartItem);
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

exports.getItemById = (cartId) => {
    return new Promise((resolve, reject) => {
       mongoose.connect(DB_URL)
           .then(() => {
              return CartItem.findById(cartId);
           }).then((cartItem) => {
               mongoose.disconnect();
               resolve(cartItem)
       }).catch(err => {
           mongoose.disconnect();
           reject(err);
       });
    });
}

