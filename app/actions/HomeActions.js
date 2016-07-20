import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getAllGoodsSuccess',
      'getAllGoodsFail',
      'addOneThisGood',
      'cutOneThisGood',
      'buySuccess',
      'buyFail'
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

  buy(want) {
    var send = JSON.stringify({input: want});
    $.ajax({
        type: 'POST',
        url: '/api/buyGoods',
        data: send,
        contentType: 'application/json',
        beforeSend: () => {
            console.log(want);
        }
    })
        .done((data) => {
            this.actions.buySuccess(data);
        })
        .fail((jqXhr) => {
            this.actions.buyFailed(jqXhr.responseJSON.message);
        });
  }
}

export default alt.createActions(HomeActions);