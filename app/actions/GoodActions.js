import alt from '../alt';

class GoodActions {
  constructor() {
    this.generateActions(
      'reportSuccess',
      'reportFail',
      'getGoodSuccess',
      'getGoodFail'
    );
  }

  getGood(GoodId) {
    $.ajax({ url: '/api/Goods/' + GoodId })
      .done((data) => {
        this.actions.getGoodSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getGoodFail(jqXhr);
      });
  }

  report(GoodId) {
    $.ajax({
      type: 'POST',
      url: '/api/report',
      data: { GoodId: GoodId }
    })
      .done(() => {
        this.actions.reportSuccess();
      })
      .fail((jqXhr) => {
        this.actions.reportFail(jqXhr);
      });
  }
}

export default alt.createActions(GoodActions);