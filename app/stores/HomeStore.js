import alt from '../alt';
import HomeActions from '../actions/HomeActions';
import {find, indexOf} from 'underscore';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.goods = [];
    this.cart = [];
    this.tipData = {boughtGoodsInformation: [], buyTwoSaveOne: []};
  }

  onGetAllGoodsSuccess(data) {
    data.map((good, index) => {
        if(good.discount == 0) {
            good.discount = "没有优惠";
        } else if (good.discount == 1) {
            good.discount = "九五折";
        } else if (good.discount == 2) {
            good.discount = "买二增一";
        } else {
            good.discount = "错误";
        }
    });
    this.goods = data;
  }

  onGetAllGoodsFail(errorMessage) {
    toastr.error(errorMessage);
  }

  onAddOneThisGood(good) {
    var existGood = find(this.cart, (oneCode) => {
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
    console.log(this.tipData);
  }

  onBuyFail(errorMessage) {
    console.log(this.tipData);
    toastr.error(errorMessage);
  }
}

export default alt.createStore(HomeStore);