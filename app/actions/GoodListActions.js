import alt from '../alt';

class GoodListActions {
  constructor() {
    this.generateActions(
      'getGoodsSuccess',
      'getGoodsFail'
    );
  }

  getGoods(payload) {
    let url = '/api/Goods/top';
    let params = {
      race: payload.race,
      bloodline: payload.bloodline
    };

    if (payload.category === 'female') {
      params.gender = 'female';
    } else if (payload.category === 'male') {
      params.gender = 'male';
    }

    if (payload.category === 'shame') {
      url = '/api/Goods/shame';
    }

    $.ajax({ url: url, data: params })
      .done((data) => {
        this.actions.getGoodsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getGoodsFail(jqXhr);
      });
  }
}

export default alt.createActions(GoodListActions);