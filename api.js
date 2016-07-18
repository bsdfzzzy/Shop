const app = require('express')();
const Good = require('./models/good');
const _ = require('underscore');
/**
 * GET /api/characters
 * Returns 2 random characters of the same gender that have not been voted yet.
 */
app.get('/api/goods', function(req, res, next) {
    Good.find((err, data) => {
        if (err) {
            return next(err);
        }
        res.send(data);
    });
});

/**
 * PUT /api/good
 * Update discount of goods.
 */
app.put('/api/goods/:id', function(req, res, next) {
    const id = req.params.id;
    const newDiscount = req.body.discount;
    Good.update({_id: id}, {$set: {discount: newDiscount}}, (e) => {
        if (e) {
            return next(e);
        }
        Good.findOne({_id: id}, (err, data) => {
            if (err) {
                return next(err);
            }
            res.send({ code: 1, newGood: data});
        });
    });
});

/**
 * GET /api/good/:id
 * Returns detailed good information.
 */
app.get('/api/goods/:id', function(req, res, next) {
  var id = req.params.id;

  Good.findOne({ _id: id }, function(err, good) {
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
app.post('/api/good', function(req, res, next) {
  var name = req.body.name;
  var price = req.body.price;
  var category = req.body.category;
  var unit = req.body.unit;
  var barcode = req.body.barcode;

  var newGood = new Good({
    name: name,
    unit: unit,
    barcode: barcode,
    price: price,
    category: category
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

module.exports = app;