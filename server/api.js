const app = require('express')();
const Good = require('../models/good');
const _ = require('underscore');
const utils = require('./utils');

/**
 * GET /api/goods
 * Return all goods
 */
app.get('/api/goods', (req, res, next) => {
    Good.find((err, data) => {
        if (err) {
            return next(err);
        }
        res.send(data);
    });
});

/**
 * PUT /api/good/:barcode
 * Update discount of goods.
 */
app.put('/api/goods/:barcode', (req, res, next) => {
    const barcode = req.params.barcode;
    const newDiscount = req.body.discount;
    Good.update({barcode: barcode}, {$set: {discount: newDiscount}}, (e) => {
        if (e) {
            return next(e);
        }
        Good.findOne({barcode: barcode}, (err, data) => {
            if (err) {
                return next(err);
            }
            res.send({ code: 1, newGood: data});
        });
    });
});

/**
 * GET /api/good/:barcode
 * Returns detailed good information.
 */
app.get('/api/goods/:barcode', (req, res, next) => {
  var barcode = req.params.barcode;

  Good.findOne({ barcode: barcode }, function(err, good) {
    if (err) return next(err);

    if (!good) {
      return res.status(404).send({ message: 'Good not found.' });
    }

    res.send(good);
  });
});

/**
 * POST /api/good
 * Adds new good to the database.
 */
app.post('/api/good', (req, res, next) => {
  var name = req.body.name;
  var price = req.body.price;
  var category = req.body.category;
  var unit = req.body.unit;
  var barcode = req.body.barcode;
  var discount = req.body.discount;

  var newGood = new Good({
    name: name,
    unit: unit,
    barcode: barcode,
    price: price,
    category: category,
    discount: discount
  });

  if ( name && price && category && unit && barcode ) {
    newGood.save((e, newGood) => {
        if (e) {
            res.status(500).send({message: 'the serve has something wrong'});
            return next(e);
        }
        res.status(200).send({code: 1, message: 'success add new good'});
    });
  }
});

/**
 * POST /api/buyGoods
 * Get the array of goods which want to buy and return a tip data
 */
app.post('/api/buyGoods', (req, res, next) => {
    var want = req.body.input;
    var boughtGoodsInformation = [], buyTwoSaveOne = [], total = {totalPrice: 0, totalSave: 0};
    if (want) {
        var buy = utils.arrayOperate(want);
        var initialIndex = 0, totalIndex = buy.length;
        buy.map((good, index) => {
            Good.findOne({barcode: good.barcode}, (err, newGood) => {
                if (err) {
                    return next(err);
                }
                var newBoughtGoodInformation = {barcode: newGood.barcode, name: newGood.name, unit: newGood.unit, price: newGood.price, num: parseInt(good.num)};
                switch(newGood.discount) {
                    case 0:
                        newBoughtGoodInformation.singleTotalPrice = newGood.price * newBoughtGoodInformation.num;
                        total.totalPrice += newBoughtGoodInformation.singleTotalPrice;
                        break;
                    case 1:
                        newBoughtGoodInformation.singleTotalPrice = parseFloat((newGood.price * newBoughtGoodInformation.num * 0.95).toFixed(2));
                        newBoughtGoodInformation.singleSave = parseFloat((newGood.price * newBoughtGoodInformation.num - newBoughtGoodInformation.singleTotalPrice).toFixed(2));
                        total.totalPrice += newBoughtGoodInformation.singleTotalPrice;
                        total.totalSave += newBoughtGoodInformation.singleSave;
                        break;
                    case 2:
                        newBoughtGoodInformation.singleTotalPrice = ((parseInt(newBoughtGoodInformation.num / 3)) * 2 + (newBoughtGoodInformation.num % 3))  * newGood.price;
                        buyTwoSaveOne.push({name: newGood.name, num: newBoughtGoodInformation.num, unit: newGood.unit});
                        total.totalPrice += newBoughtGoodInformation.singleTotalPrice;
                        total.totalSave += newBoughtGoodInformation.num * newGood.price - newBoughtGoodInformation.singleTotalPrice;
                        break;
                }
                boughtGoodsInformation.push(newBoughtGoodInformation);
                initialIndex += 1;
            });
        });
        setTimeout(() => {
            res.send({boughtGoodsInformation: boughtGoodsInformation, buyTwoSaveOne: buyTwoSaveOne, total: total, code: 1})
        }, 500);
    }
});


module.exports = app;