import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getAllGoodsSuccess',
      'getAllGoodsFail',
      'addOneThisGood',
      'cutOneThisGood',
      'buySuccess',
      'buyFailed'
    );
  }

  getAllGoods() {
    $.ajax({ url: '/api/goods' })
      .done(data => {
        this.actions.getAllGoodsSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getAllGoodsFail(jqXhr.responseJSON.message);
      });
  }

  buy(cart) {
    $.ajax({
        type: 'POST',
        url: '/api/buyGoods',
        data: cart
    })
        .done(data => {
            this.actions.buySuccess(data);
        })
        .fail(jqXhr => {
            this.actions.buyFailed(jqXhr.responseJSON.message);
        });
  }
}

export default alt.createActions(HomeActions);