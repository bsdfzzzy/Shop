const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');
const config = require('../server/config');
const app = require('../server/server');

var url = 'http://localhost.com:3000';
var newGood = {
    name: '可口可乐',
    unit: '瓶',
    barcode: 'ITEM000000',
    price: 3,
    category: '食品',
    discount: 2
};

var newGood2 = {
    name: '雪碧',
    unit: '瓶',
    barcode: 'ITEM000001',
    price: 3,
    category: '食品',
    discount: 1
}

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

    it('should return 1 when adding goods', (done) => {
        request(app)
            .post('/api/good')
            .send(newGood2)
            .expect(200)
            .end((e, r) => {
                if (e) {
                    throw e;
                }
                r.body.code.should.equal(1);
                done();
            });
    });
});

describe('test get/good and put/good API', () => {

    var id = "";
    var id2 = "";

    it('should return a json of good when attach to /api/goods by get method', (done) => {
        request(app)
            .get('/api/goods')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                res.body[0].name.should.equal('可口可乐');
                res.body[0].price.should.equal(3);
                res.body[0].barcode.should.equal('ITEM000000');
                res.body[1].name.should.equal('雪碧');
                res.body[1].price.should.equal(3);
                res.body[1].barcode.should.equal('ITEM000001');
                id = res.body[0].barcode;
                id2 = res.body[1].barcode;
                done();
            });
    });

    it('should return a code of 1 if success update data', (done) => {
        const url = '/api/goods/' + id;
        request(app)
            .put(url)
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

    it('should return a code of 1 if success update data', done => {
        const url2 = '/api/goods/' + id2;
        request(app)
            .put(url2)
            .send({discount: 2})
            .expect(200)
            .end((e, r) => {
                if(e) {
                    throw e;
                }
                r.body.newGood.discount.should.equal(2);
                done();
            });
    });

});

describe('test post/buyGood API', (done) => {
    var want = {input: ['ITEM000001-3']};
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
                res.body.total.totalPrice.should.equal(8.55);
                res.body.boughtGoodsInformation[0].singleTotalPrice.should.equal(8.55);
                done();
            });
    });

    it('should return json for tip, total price 3', done => {
        var want2 = {input: ['ITEM000000-4','ITEM000001-3']}
        request(app)
            .post('/api/buyGoods')
            .send(want2)
            .expect(200)
            .end((e, r) => {
                if (e) {
                    throw e;
                }
                r.body.code.should.equal(1);
                r.body.boughtGoodsInformation[0].singleTotalPrice.should.equal(11.4);
                r.body.boughtGoodsInformation[0].singleSave.should.equal(0.6);
                r.body.buyTwoSaveOne[0].name.should.equal('雪碧');
                r.body.buyTwoSaveOne[0].num.should.equal(3);
                r.body.boughtGoodsInformation[1].singleTotalPrice.should.equal(6);
                r.body.total.totalPrice.should.equal(17.4);
                r.body.total.totalSave.should.equal(3.6);
                done();
            });
    });
});