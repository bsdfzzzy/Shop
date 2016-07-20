import alt from '../alt';

class NavbarActions {
  constructor() {
    this.generateActions(
      'updateOnlineUsers',
      'updateAjaxAnimation'
    );
  }
}

export default alt.createActions(NavbarActions);