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
    var want = [];
    cart.map((item, index) => {
        if (item.num === 1) {
            want.push(item.barcode);
        } else {
            want.push(item.barcode + "-" + item.num);
        }
    });
    HomeActions.buy(want);
  }

  render() {
    var goodNodes = this.state.goods.map((good, index) => {
      return (
        <div key={good._id} className="good">
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
              <button className='addOneThisGood' onClick={this.addOneThisGood.bind(this, good)}> 加一个 </button>
              <button className='cutOneThisGood' onClick={this.cutOneThisGood.bind(this, good)}> 减一个 </button>
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


    var boughtGoodsInformationNodes = this.state.tipData.boughtGoodsInformation.map((good, index) => {
        if(good.singleSave) {
            return (
                <div key={good.barcode}>
                    名称：{good.name}，
                    数量：{good.num}{good.unit}，
                    单价：{good.price}(元)，
                    小计：{good.singleTotalPrice}(元)，
                    优惠：{good.singleSave}(元)
                </div>
            );
        } else {
            return (
                <div key={good.barcode}>
                    名称：{good.name}，
                    数量：{good.num}{good.unit}，
                    单价：{good.price}(元)，
                    小计：{good.singleTotalPrice}(元)
                </div>
            );
        }
    });
    var buyTwoSaveOne = this.state.tipData.buyTwoSaveOne.map((item, index) => {
        return (
            <div key={item.name}>
                名称：{item.name}，数量：{item.num}{item.unit}
            </div>
        );
    });
    if (this.state.tipData.buyTwoSaveOne.length != 0) {
        var buyTwoSaveOneNodes =
        (
            <div>
                <p>-------------------------</p>
                <p>买二增一商品：</p>
                {buyTwoSaveOne}
            </div>
        );
    };
    if (this.state.tipData.total) {
        var totalNodes =
            <div>
                <p>-------------------------</p>
                <p>总计：{this.state.tipData.total.totalPrice}(元)</p>
                <p>优惠：{this.state.tipData.total.totalSave}(元)</p>
                <p>*************************</p>
            </div>
        ;
    }

    return (
      <div className='container'>
        <table>
          <tr>
            <td className='row col-xs-7 col-sm-7 col-md-6 goodContainer'>
              {goodNodes}
              <button className='buy row col-xs-4 col-sm-4 col-md-2' onClick={this.handleBuy.bind(this, this.state.cart)}>点击购买购物车中物品</button>
            </td>
            <td className="row col-xs-7 col-sm-7 col-md-6 cartContainer">
              <div className="cart">
                <p>购物车：</p>
                {cartNodes}
              </div>
              <div className='tip'>
                <p>*** 没钱赚商店 购物清单***</p>
                {boughtGoodsInformationNodes}
                {buyTwoSaveOneNodes}
                {totalNodes}
              </div>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Home;