import alt from '../alt';

class AddGoodActions {
  constructor() {
    this.generateActions(
      'addGoodSuccess',
      'addGoodFail',
      'updateName',
      'updateUnit',
      'updatePrice',
      'updateCategory',
      'updateBarcode',
      'updateDiscount',
      'invalidName',
      'invalidUnit',
      'invalidPrice',
      'invalidCategory',
      'invalidBarcode',
      'invalidDiscount'
    );
  }

  addGood(name, unit, price, category, barcode, discount) {
    var newGood = JSON.stringify({name: name, unit: unit, price: price, category: category, barcode: barcode, discount: discount});
    $.ajax({
      type: 'POST',
      url: '/api/good',
      data: newGood,
      contentType: 'application/json'
    })
      .done((data) => {
        this.actions.addGoodSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.addGoodFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddGoodActions);