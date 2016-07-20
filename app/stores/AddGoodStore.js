import alt from '../alt';
import AddGoodActions from '../actions/AddGoodActions';

class AddGoodStore {
  constructor() {
    this.bindActions(AddGoodActions);
    this.name = '';
    this.unit = '';
    this.category = '';
    this.price = 0;
    this.barcode = '';
    this.discount = '';
    this.helpBlock = '';
    this.nameHelpBlock = '';
    this.unitHelpBlock = '';
    this.priceHelpBlock = '';
    this.categoryHelpBlock= '';
    this.barcodeHelpBlock = '';
    this.discountHelpBlock = '';
    this.nameValidationState = '';
    this.unitValidationState = '';
    this.priceValidationState = '';
    this.categoryValidationState = '';
    this.barcodeValidationState = '';
    this.discountValidationState = '';
  }

  onAddGoodSuccess(successMessage) {
    this.nameValidationState = 'has-success';
    this.unitValidationState = 'has-success';
    this.priceValidationState = 'has-success';
    this.categoryValidationState = 'has-success';
    this.barcodeValidationState = 'has-success';
    this.discountValidationState = 'has-success';
    this.helpBlock = "添加成功";
  }

  onAddGoodFail(errorMessage) {
    this.helpBlock = errorMessage;
  }

  onUpdateName(event) {
    this.name = event.target.value;
    this.nameValidationState = '';
    this.nameHelpBlock = '';
  }

  onUpdateUnit(event) {
    this.unit = event.target.value;
    this.unitValidationState = '';
    this.unitHelpBlock = '';
  }

  onUpdatePrice(event) {
    this.price = event.target.value;
    this.priceValidationState = '';
    this.priceHelpBlock = '';
  }

  onUpdateCategory(event) {
    this.category = event.target.value;
    this.categoryValidationState = '';
    this.categoryHelpBlock = '';
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

  onInvalidName() {
    this.nameValidationState = 'has-error';
    this.nameHelpBlock = 'Please enter a Good name.';
  }

  onInvalidUnit() {
    this.unitValidationState = 'has-error';
    this.unitHelpBlock = 'Please enter a Good unit.';
  }
  onInvalidPrice() {
    this.priceValidationState = 'has-error';
    this.priceHelpBlock = 'Please enter a Good price.';
  }
  onInvalidCategory() {
    this.categoryValidationState = 'has-error';
    this.categoryHelpBlock = 'Please enter a Good category.';
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

export default alt.createStore(AddGoodStore);