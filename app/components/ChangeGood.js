import React from 'react';
import ChangeGoodStore from '../stores/ChangeGoodStore';
import ChangeGoodActions from '../actions/ChangeGoodActions';

class ChangeGood extends React.Component {
  constructor(props) {
    super(props);
    this.state = ChangeGoodStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ChangeGoodStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ChangeGoodStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var barcode = this.state.barcode.trim();
    var discount = this.state.discount;

    if (!barcode) {
        ChangeGoodActions.invalidBarcode();
        this.refs.barcodeTextField.focus();
    }

    if (!discount) {
        ChangeGoodActions.invalidDiscount();
        this.refs.discountTextField.focus();
    }

    if (barcode && discount) {
      ChangeGoodActions.changeGood(barcode, discount);
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
                  <div className={'form-group ' + this.state.barcodeValidationState}>
                    <label className='control-label'>商品条形码</label>
                    <input type='text' className='form-control' ref='barcodeTextField' value={this.state.barcode} onChange={ChangeGoodActions.updateBarcode}/>
                    <span className='help-block'>{this.state.barcodeHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.barcodeValidationState}>
                    <label className='control-label'>商品优惠形式</label>
                    <select className='form-control' ref='discountTextField' onChange={ChangeGoodActions.updateDiscount}>
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

export default ChangeGood;