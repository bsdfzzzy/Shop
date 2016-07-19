import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    HomeActions.getAllGoods();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  addOneThisGood(good) {
    HomeActions.addOneThisGood(good);
  }

  cutOneThisGood(good) {
    HomeActions.cutOneThisGood(good);
  }

  handleBuy(cart) {
    HomeActions.buy(cart);
  }

  render() {
    var goodNodes = this.state.goods.map((good, index) => {
      return (
        <div key={good._id} className={index === 0 ? 'col-xs-6 col-sm-6 col-md-5 col-md-offset-1' : 'col-xs-6 col-sm-6 col-md-5'}>
          <div className='thumbnail fadeInUp animated'>
            <div className='caption text-center'>
              <ul className='list-inline'>
                <li><strong> 条形码： </strong> {good.barcode}</li>
                <li><strong> 商品名称： </strong> {good.name}</li>
                <li><strong> 商品单位： </strong> {good.unit}</li>
                <li><strong> 商品种类： </strong> {good.category}</li>
                <li><strong> 商品单价： </strong> {good.price}</li>
                <li><strong> 优惠类型： </strong> {good.discount}</li>
              </ul>
              <button className='addOneThisGood' onClick={this.addOneThisGood.bind(this, good)}> + </button>
              <button className='cutOneThisGood' onClick={this.cutOneThisGood.bind(this, good)}> - </button>
            </div>
          </div>
        </div>
      );
    });

    var cartNodes = this.state.cart.map((good, index) => {
        return (
            <div key={good._id}>
                条形码：{good.barcode}, 名称：{good.name}, 数量：{good.num}
            </div>
        );
    });

    return (
      <div className='container'>
        <div className='row col-xs-6 col-sm-6 col-md-5'>
          {goodNodes}
        </div>
        <div className="row col-xs-6 col-sm-6 col-md-5">
          <div>{cartNodes}</div>
        </div>
        <button className='buy' onClick={this.handleBuy.bind(this, this.state.cart)}>点击购买购物车中物品</button>
      </div>
      <div></div>
    );
  }
}

export default Home;