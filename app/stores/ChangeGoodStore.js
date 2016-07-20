import alt from '../alt';
import ChangeGoodActions from '../actions/ChangeGoodActions';

class ChangeGoodStore {
  constructor() {
    this.bindActions(ChangeGoodActions);
    this.name = '';
    this.unit = '';
    this.category = '';
    this.price = 0;
    this.barcode = '';
    this.discount = '';
    this.helpBlock = '';
    this.barcodeHelpBlock = '';
    this.discountHelpBlock = '';
    this.barcodeValidationState = '';
    this.discountValidationState = '';
  }

  onChangeGoodSuccess(successMessage) {
    this.barcodeValidationState = 'has-success';
    this.discountValidationState = 'has-success';
    this.helpBlock = "添加成功";
  }

  onChangeGoodFail(errorMessage) {
    this.helpBlock = errorMessage;
  }

  onUpdateBarcode(event) {
    this.barcode = event.target.value;
    this.barcodeValidationState = '';
    this.barcodeHelpBlock = '';
  }

  onUpdateDiscount(event) {
    this.discount = event.target.value;
    this.discountValidationState = '';
    this.discountHelpBlock = '';
  }

  onInvalidBarcode() {
    this.barcodeValidationState = 'has-error';
    this.barcodeHelpBlock = 'Please enter a Good barcode.';
  }

  onInvalidDiscount() {
    this.discountValidationState = 'has-error';
    this.discountHelpBlock = 'Please select a Good discount';
  }
}

export default alt.createStore(ChangeGoodStore);