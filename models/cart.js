/*
Cart constructor. It will take the old object if there is one otherwise
creates new cart. Add function add new item to cart.
*/

module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
	this.totalPrice = Math.round(oldCart.totalPrice * 100) / 100 || 0;

    this.add = function(item, id) {
        var storedItem = this.items[id];
		if (!storedItem){
			storedItem = this.items[id] = {item: item, qty: 0, price: 0};
		}
		if (storedItem.item.inventory_count > 0 && storedItem.qty < storedItem.item.inventory_count) {
			storedItem.qty++;
			storedItem.price = storedItem.item.price * storedItem.qty;
			storedItem.price = Math.round(storedItem.price * 100) / 100;
			this.totalQty++;
			this.totalPrice += storedItem.item.price;
		}
    }

    this.decreaseQty = function(id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
		this.items[id].price = Math.round(this.items[id].price * 100) / 100;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price

        if(this.items[id].qty <= 0) {
            delete this.items[id];
        }
    }
    this.increaseQty = function(id) {
		console.log(this.items[id].item.inventory_count);
		if (this.items[id].qty < this.items[id].item.inventory_count) {
			this.items[id].qty++;
			this.items[id].price += this.items[id].item.price;
			this.items[id].price = Math.round(this.items[id].price * 100) / 100;
			this.totalQty++;
			this.totalPrice += this.items[id].item.price
		}
    }

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
			arr.push(this.items[id])
        }
        return arr;
    }
};