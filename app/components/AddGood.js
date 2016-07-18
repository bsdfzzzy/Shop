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
    var gender = this.state.gender;

    if (!name) {
      AddGoodActions.invalidName();
      this.refs.nameTextField.focus();
    }

    if (!gender) {
      AddGoodActions.invalidGender();
    }

    if (name && gender) {
      AddGoodActions.addGood(name, gender);
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
                    <input type='text' className='form-control' ref='priceTextField' value={this.state.price} onChange={AddGoodActions.updatePrice}/>
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
                  <button type='submit' className='btn btn-primary'>Submit</button>
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