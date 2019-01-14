var express                 = require('express');
var router                  = express.Router();
var Product       			= require('../models/product');
var Cart                    = require('../models/cart');
var Order                   = require('../models/order');
var paypal					= require('paypal-rest-sdk');

// GET checkout page
router.get('/', ensureAuthenticated, function(req, res, next){
    console.log(`ROUTE: GET CHECKOUT PAGE`)
    var cart = new Cart(req.session.cart)
    var totalPrice = cart.totalPrice;
    res.render('checkout', {title: 'Checkout Page', items: cart.generateArray(), totalPrice: cart.totalPrice, bodyClass: 'registration', containerWrapper: 'container', userFirstName: req.user.fullname});
})

// POST checkout-process
router.post('/checkout-process', function(req, res){
   console.log(`ROUTE: POST CHECKOUT-PROGRESS`)
    var cart = new Cart(req.session.cart);
    var totalPrice = cart.totalPrice;
	
	var create_payment_json = {
		"intent": "sale",
		"payer": {
			"payment_method": "paypal"
		},
		"redirect_urls": {
			"return_url": "http://localhost:3000/checkout/checkout-success",
			"cancel_url": "http://localhost:3000/checkout/checkout-cancel"
		},
		"transactions": [{
			"item_list": {
				"items": []
			},
			"amount": {
				"currency": "CAD",
				"total": totalPrice
			},
			"description": "Thank you for purchasing at Zahid's Store"
		}]
	};
	
	var cartItems = cart.generateArray();
	for (let i = 0; i < cartItems.length; i++) {
		var item = {};
		item.name = cartItems[i]['item']['title'];
		item.sku = cartItems[i]['item']['_id'];
		item.price = cartItems[i]['item']['price'];
		item.currency = "CAD";
		item.quantity = cartItems[i]['qty'];
		create_payment_json['transactions'][0]['item_list']['items'].push(item);
	}
	
	paypal.payment.create(create_payment_json, function (error, payment) {
		if (error) {
			console.log(error);
			res.redirect(302, '/checkout/checkout-cancel')
		} else {
			for (let i = 0; i < payment.links.length; i++) {
				if (payment.links[i].rel === 'approval_url') {
					res.redirect(payment.links[i].href);
				}
			}
		}
	});
});

// GET checkout-success
router.get('/checkout-success', ensureAuthenticated, function(req, res){
    console.log(`ROUTE: GET CHECKOUT-SUCCESS`)
    var cart = new Cart(req.session.cart);
    var totalPrice = cart.totalPrice;
	
	// Decrease the amount in stock after checkout was successfull based on amount purchased
	console.log(cart);
	for (var id in cart.items) {
		Product.findOneAndUpdate({"_id": id}, 
		{
			$set: {
				"imagePath"   : cart.items[id].item.imagePath,
				"title"       : cart.items[id].item.title,
				"description" : cart.items[id].item.description,
				"price"       : cart.items[id].item.price,
				"inventory_count" : cart.items[id].item.inventory_count - cart.items[id].qty
			}
		}, { new: true }, function(err, result){if(err) console.log(err);});
	}
	
	req.session.cart = {}; // Empty the cart if payment was succesful
	
	var payerId = req.query.PayerID;
	var paymentId = req.query.paymentId;
	
	var execute_payment_json = {
		"payer_id": payerId,
		"transactions": [{
			"amount": {
				"currency": "CAD",
				"total": totalPrice.toString()
			}
		}]
	};
	
	paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {
		if (error) {
			console.log(error.response);
			throw error;
		}
		var addrObj = payment['payer']['payer_info']['shipping_address'];
		var addr = addrObj['line1'] + ' ' + addrObj['city'] + ' ' + addrObj['state'] + ' ' + addrObj['country_code'] + ' ' + addrObj['postal_code'];
		var newOrder = new Order({
			orderID             : payment.cart,
			username            : req.user.username,
			address             : addr,
			orderDate           : payment['create_time'],
			shipping            : true
		});
		newOrder.save(function(err) {
			if (err) throw err;
			console.log("Added to Order History");
		});
	});
	
	
    res.render('checkoutSuccess', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname})
});

// PAYMENT CANCEL
router.get('/checkout-cancel', ensureAuthenticated, function(req, res){
	req.session.cart = {};
    console.log(`ROUTE: GET CHECKOUT-CANCEL`)
    res.render('checkoutCancel', {title: 'Cancelled', containerWrapper: 'container', userFirstName: req.user.fullname});
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        console.log(`ERROR: USER IS NOT AUTHENTICATED`)
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/');
    }
}

module.exports = router;
