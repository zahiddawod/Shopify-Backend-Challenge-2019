var Product     = require('../models/product');
var User        = require('../models/user');
var Order       = require('../models/order');
var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost/shoppingApp');

// The purpose of this script is to generate temporary data for testing purposes.

var products = [
    new Product({
        imagePath   : 'https://oldnavy.gapcanada.ca/webcontent/0014/891/686/cn14891686.jpg',
        title       : 'Hooded Anorak for Men',
        description : 'Built-in hood, with adjustable drawstring. Full-front zipper and snap-close storm guard from hem to chin.Long sleeves, with buttoned cuffs.',
        price       : 79.94,
		inventory_count: 2
    }),
    new Product({
        imagePath   : 'https://oldnavy.gapcanada.ca/webcontent/0014/529/725/cn14529725.jpg',
        title       : 'Water-Resistant Hooded Nylon Anorak for Men',
        description : 'Covered snap-flap pockets at chest. Vertical side-zip welt pockets in front. Adjustable drawcord at right side of them.',
        price       : 64.94,
		inventory_count: 5
    }),
    new Product({
        imagePath   : 'https://oldnavy.gapcanada.ca/webcontent/0013/568/464/cn13568464.jpg',
        title       : 'Bomber Jacket for Men',
        description : 'Rib-knit collar, with hanging loop inside. Long sleeves, with rib-knit cuffs. Full-length zipper from hem to chin.',
        price       : 38.94,
		inventory_count: 0
    }),
    new Product({
        imagePath   : 'https://oldnavy.gapcanada.ca/webcontent/0015/240/146/cn15240146.jpg',
        title       : 'Built-In Flex Chore Jacket for Men',
        description : 'Large patch pockets near hem. Six-button placket. Soft, medium-weight cotton.',
        price       : 42.94,
		inventory_count: 20
    }),
    new Product({
        imagePath   : 'https://oldnavy.gapcanada.ca/webcontent/0014/080/817/cn14080817.jpg',
        title       : 'Insulated-Stretch Peacoat for Men',
        description : 'Long sleeves. Spacious diagonal welt pockets at chest. Flap welt pockets at front.',
        price       : 35.99,
		inventory_count: 12
    }),
    new Product({
        imagePath   : 'https://oldnavy.gapcanada.ca/webcontent/0014/899/889/cn14899889.jpg',
        title       : 'Nylon-Blend Military Jacket for Men',
        description : 'Spacious button-flap patch pockets at chest. Button-flap pockets in front, with hand-warming on-seam side pockets. Durable, cotton-nylon blend.',
        price       : 59.50,
		inventory_count: 3
    }),
    new Product({
        imagePath   : 'https://oldnavy.gapcanada.ca/webcontent/0015/105/250/cn15105250.jpg',
        title       : 'Water-Resistant Nylon Bomber Jacket for Men',
        description : 'Zippered pocket at upper left arm. Full-length zipper from hem to chin. Vertical chest pocket. Snap-close patch pockets near hem.',
        price       : 55.50,
		inventory_count: 1
    }),
    new Product({
        imagePath   : 'https://oldnavy.gapcanada.ca/webcontent/0014/219/304/cn14219304.jpg',
        title       : 'Hooded Parka for Men',
        description : 'Removable faux-fur-lined hood, with sherpa lining and adjustable drawcord. Long sleeves, with snap-tab cuffs. Full-length hidden zipper from hem to chin, with buttoned placket.',
        price       : 68.99,
		inventory_count: 11
    }),
    new Product({
        imagePath   : 'https://oldnavy.gapcanada.ca/webcontent/0013/816/952/cn13816952.jpg',
        title       : 'Frost Free Detachable-Hood Jacket for Men',
        description : 'Snap-close, Micro-Fleece-lined pockets, with side entry. Frost Free shell with smooth lining and plush fill. Water-resistant fabric helps keep rain off your parade.',
        price       : 47.99,
		inventory_count: 6
    }),
    new Product({
        imagePath   : 'https://oldnavy.gapcanada.ca/webcontent/0014/975/842/cn14975842.jpg',
        title       : 'Quilted Down-Fill Nylon Jacket for Men',
        description : 'With Down & Feathers fill. Snug as a duck in a rug. Water-resistant fabric helps keep rain off your parade. Packable construction, with interior pockets that convert easily into a portable sack.',
        price       : 75.00,
		inventory_count: 6
    }),
    new Product({
        imagePath   : 'https://oldnavy.gapcanada.ca/webcontent/0014/068/072/cn14068072.jpg',
        title       : 'Garment-Dyed Built-In-Flex Twill Jacket for Men',
        description : 'Engineered with innovative Built-In Flex stretch technology. Equal parts comfort & movement. Soft, garment-dyed cotton twill has a vintage look and feel that improves with each washing. Colors may rub off on lighter surfaces.',
        price       : 74.94,
		inventory_count: 9
    })

];

// Delete everything from the database before adding the new content
Product.remove({}, function(err){
  if(err) {
    console.log('ERROR: Removing Products failed');
    return;
  }
});

User.remove({}, function(err){
  if(err) {
    console.log('ERROR: Removing Users failed');
    return;
  }
});

Order.remove({}, function(err){
  if(err) {
    console.log('ERROR: Removing Orders failed');
    return;
  }
});

for (var i = 0; i < products.length; i++){
    products[i].save(function(err, result) {
        if (i === products.length - 1){
            exit();
        }
    });
}

var zahid = new User({
    username    : 'admin@admin.com',
    password    : 'admin',
    fullname    : 'Zahid Dawod',
    admin       : true
});
var sacha = new User({
    username    : 'sacha@shopify.com',
    password    : 'adkins',
    fullname    : 'Sacha Adkins',
    admin       : true
});
var newUser = new User({
    username    : 'user',
    password    : 'pass',
    fullname    : 'David Suzuki',
    admin       : false
});
User.createUser(zahid, function(err, user){
    if(err) throw err;
    console.log(user);
});
User.createUser(sacha, function(err, user){
    if(err) throw err;
    console.log(user);
});
User.createUser(newUser, function(err, user){
    if(err) throw err;
    console.log(user);
});

function exit() {
    mongoose.disconnect();
}
