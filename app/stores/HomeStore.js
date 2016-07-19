import alt from '../alt';
import HomeActions from '../actions/HomeActions';
import {find, indexOf} from 'underscore';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.goods = [];
    this.cart = [];
    this.tipData = {};
  }

  onGetAllGoodsSuccess(data) {
    this.goods = data;
  }

  onGetAllGoodsFail(errorMessage) {
    toastr.error(errorMessage);
  }

  onAddOneThisGood(good) {
    var existGood = find(this.cart, (oneCode) => {
        console.log(oneCode.barcode + '``````````````' + good.barcode);
        return oneCode.barcode == good.barcode;
    });
    if (!existGood) {
        this.cart.push({barcode: good.barcode, name: good.name, num: 1});
    } else {
        existGood.num += 1;
    }
  }

  onCutOneThisGood(good) {
    var existGood = find(this.cart, (oneGood) => {
        return oneGood.barcode == good.barcode;
    });
    if (existGood) {
        if (existGood.num === 1) {
            var index = indexOf(this.cart, existGood);
            this.cart.splice(index, 1);
        } else {
            existGood.num -= 1;
        }
    }
  }

  onBuySuccess(data) {
    this.tipData = data;
  }

  onBuyFailed(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(HomeStore);