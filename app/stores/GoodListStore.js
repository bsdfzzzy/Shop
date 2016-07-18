import alt from '../alt';
import GoodListActions from '../actions/GoodListActions';

class GoodListStore {
  constructor() {
    this.bindActions(GoodListActions);
    this.Goods = [];
  }

  onGetGoodsSuccess(data) {
    this.Goods = data;
  }

  onGetGoodsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(GoodListStore);