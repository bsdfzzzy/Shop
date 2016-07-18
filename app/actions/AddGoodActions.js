import alt from '../alt';

class AddGoodActions {
  constructor() {
    this.generateActions(
      'addGoodSuccess',
      'addGoodFail',
      'updateName',
      'updateGender',
      'invalidName',
      'invalidGender'
    );
  }

  addGood(name, gender) {
    $.ajax({
      type: 'POST',
      url: '/api/Goods',
      data: { name: name, gender: gender }
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