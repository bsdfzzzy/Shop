import alt from '../alt';
import AddGoodActions from '../actions/AddGoodActions';

class AddGoodStore {
  constructor() {
    this.bindActions(AddGoodActions);
    this.name = '';
    this.unit = '';
    this.helpBlock = '';
    this.nameHelpBlock = '';
    this.unitHelpBlock = '';
    this.priceHelpBlock = '';
    this.categoryHelpBlock= '';
    this.barcodeHelpBlock = '';
    this.nameValidationState = '';
    this.unitValidationState = '';
    this.priceValidationState = '';
    this.categoryValidationState = '';
    this.barcodeValidationState = '';
  }

  onAddGoodSuccess(successMessage) {
    this.nameValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onAddGoodFail(errorMessage) {
    this.nameValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateName(event) {
    this.name = event.target.value;
    this.nameValidationState = '';
    this.helpBlock = '';
  }

  onUpdateGender(event) {
    this.gender = event.target.value;
    this.genderValidationState = '';
  }

  onInvalidName() {
    this.nameValidationState = 'has-error';
    this.nameHelpBlock = 'Please enter a Good name.';
  }

  onInvalidUnit() {
    this.unitValidationState = 'has-error';
    this.unitHelpBlock = '';
  }
  onInvalidPrice() {
    this.priceValidationState = 'has-error';
    this.priceHelpBlock = '';
  }
  onInvalidCategory() {
    this.categoryValidationState = 'has-error';
    this.categoryHelpBlock = '';
  }
  onInvalidBarcode() {
    this.barcodeValidationState = 'has-error';
    this.barcodeHelpBlock = '';
  }
}

export default alt.createStore(AddGoodStore);