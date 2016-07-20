import alt from '../alt';

class ChangeGoodActions {
  constructor() {
    this.generateActions(
      'changeGoodSuccess',
      'changeGoodFail',
      'updateBarcode',
      'updateDiscount',
      'invalidBarcode',
      'invalidDiscount'
    );
  }

  changeGood(barcode, discount) {
    var changeDiscount = JSON.stringify({discount: discount});
    $.ajax({
      type: 'PUT',
      url: '/api/goods/' + barcode,
      data: changeDiscount,
      contentType: 'application/json'
    })
      .done((data) => {
        this.actions.changeGoodSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.changeGoodFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(ChangeGoodActions);