var mongoose    = require('mongoose');


var productSchema  = mongoose.Schema({
    imagePath: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
	inventory_count: {
		type: Number
	}
});

module.exports = mongoose.model('Product', productSchema);