const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');
const config = require('../config');
const app = require('../server');

var url = 'http://localhost.com:3000';
var newGood = {
    name: '雪碧',
    unit: '瓶',
    barcode: 'ITEM000001',
    price: 3,
    category: '食品'
};

describe('test post/good API', () => {

    it('should return 1 when adding goods', (done) => {

        request(app)
            .post('/api/good')
            .send(newGood)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                res.body.code.should.equal(1);
                done();
            });
    });
});

describe('test get/good and put/good API', () => {

    var id = "";

    it('should return a json of good when attach to /api/goods by get method', (done) => {
        request(app)
            .get('/api/goods')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                res.body[0].name.should.equal('newName');
                res.body[0].price.should.equal(1);
                res.body[0].barcode.should.equal('newBarcod');
                id = res.body[3]._id;
                done();
            });
    });

    it('should return a code of 1 if success update date', (done) => {
        const url = '/api/goods' + id;
        request(app)
            .put('/api/goods/' + id)
            .send({discount: 1})
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                res.body.newGood.discount.should.equal(1);
                done();
            });
    });

});

describe('test post/buyGood API', (done) => {
    var want = {input: ['ITEM000000-3']};
    var want2 = {input: ['ITEM000001-3']};
    it('should return json for tip, total price 9', (done) => {
        request(app)
            .post('/api/buyGoods')
            .send(want)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                res.body.code.should.equal(1);
                res.body.total.totalPrice.should.equal(9);
                res.body.boughtGoodsInformation[0].singleTotalPrice.should.equal(9);
                done();
            });
    });

    it('should return json for tip, single total price 8.55', (done) => {
        request(app)
            .post('/api/buyGoods')
            .send(want2)
            .expect(200)
            .end((e, r) => {
                if (e) {
                    throw e;
                }
                r.body.code.should.equal(1);
                r.body.boughtGoodsInformation[0].singleTotalPrice.should.equal(8.55);
                done();
            });
    });
});