import {assign, contains} from 'underscore';
import alt from '../alt';
import GoodActions from '../actions/GoodActions';

class GoodStore {
  constructor() {
    this.bindActions(GoodActions);
    this.GoodId = 0;
    this.name = 'TBD';
    this.race = 'TBD';
    this.bloodline = 'TBD';
    this.gender = 'TBD';
    this.wins = 0;
    this.losses = 0;
    this.winLossRatio = 0;
    this.isReported = false;
  }

  onGetGoodSuccess(data) {
    assign(this, data);
    $(document.body).attr('class', 'profile ' + this.race.toLowerCase());
    let localData = localStorage.getItem('NEF') ? JSON.parse(localStorage.getItem('NEF')) : {};
    let reports = localData.reports || [];
    this.isReported = contains(reports, this.GoodId);
    this.winLossRatio = ((this.wins / (this.wins + this.losses) * 100) || 0).toFixed(1);
  }

  onGetGoodFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onReportSuccess() {
    this.isReported = true;
    let localData = localStorage.getItem('NEF') ? JSON.parse(localStorage.getItem('NEF')) : {};
    localData.reports = localData.reports || [];
    localData.reports.push(this.GoodId);
    localStorage.setItem('NEF', JSON.stringify(localData));
    toastr.warning('Good has been reported.');
  }

  onReportFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(GoodStore);