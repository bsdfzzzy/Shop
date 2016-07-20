import React from 'react';
import AddGoodStore from '../stores/AddGoodStore';
import AddGoodActions from '../actions/AddGoodActions';

class AddGood extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddGoodStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddGoodStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AddGoodStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var name = this.state.name.trim();
    var unit = this.state.unit.trim();
    var price = this.state.price;
    var category = this.state.category.trim();
    var barcode = this.state.barcode.trim();
    var discount = this.state.discount;

    if (!name) {
      AddGoodActions.invalidName();
      this.refs.nameTextField.focus();
    }

    if (!unit) {
      AddGoodActions.invalidUnit();
      this.refs.unitTextField.focus();
    }

    if (!price) {
        AddGoodActions.invalidPrice();
        this.refs.priceTextField.focus();
    }

    if (!category) {
        AddGoodActions.invalidCategory();
        this.refs.categoryTextField.focus();
    }

    if (!barcode) {
        AddGoodActions.invalidBarcode();
        this.refs.barcodeTextField.focus();
    }

    if (!discount) {
        AddGoodActions.invalidDiscount();
        this.refs.discountTextField.focus();
    }

    if (name && unit && price && category && barcode && discount) {
      AddGoodActions.addGood(name, unit, price, category, barcode, discount);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>添加商品</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.nameValidationState}>
                    <label className='control-label'>商品名称</label>
                    <input type='text' className='form-control' ref='nameTextField' value={this.state.name}
                           onChange={AddGoodActions.updateName} autoFocus/>
                    <span className='help-block'>{this.state.nameHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.unitValidationState}>
                    <label className='control-label'>商品单位</label>
                    <input type='text' className='form-control' ref='unitTextField' value={this.state.unit} onChange={AddGoodActions.updateUnit}/>
                    <span className='help-block'>{this.state.unitHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.priceValidationState}>
                    <label className='control-label'>商品单价</label>
                    <input type='number' className='form-control' ref='priceTextField' value={this.state.price} onChange={AddGoodActions.updatePrice}/>
                    <span className='help-block'>{this.state.priceHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.categoryValidationState}>
                    <label className='control-label'>商品类别</label>
                    <input type='text' className='form-control' ref='categoryTextField' value={this.state.category} onChange={AddGoodActions.updateCategory}/>
                    <span className='help-block'>{this.state.categoryHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.barcodeValidationState}>
                    <label className='control-label'>商品条形码</label>
                    <input type='text' className='form-control' ref='barcodeTextField' value={this.state.barcode} onChange={AddGoodActions.updateBarcode}/>
                    <span className='help-block'>{this.state.barcodeHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.barcodeValidationState}>
                    <label className='control-label'>商品优惠形式</label>
                    <select className='form-control' ref='discountTextField' onChange={AddGoodActions.updateDiscount}>
                      <option value="0">没有优惠</option>
                      <option value="1">九五折</option>
                      <option value="2">买二增一</option>
                    </select>
                    <span className='help-block'>{this.state.discountHelpBlock}</span>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                  <span className='help-block'>{this.state.helpBlock}</span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddGood;