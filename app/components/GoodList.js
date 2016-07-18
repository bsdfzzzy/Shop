import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import GoodListStore from '../stores/GoodListStore';
import GoodListActions from '../actions/GoodListActions';

class GoodList extends React.Component {
  constructor(props) {
    super(props);
    this.state = GoodListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    GoodListStore.listen(this.onChange);
    GoodListActions.getGoods(this.props.params);
  }

  componentWillUnmount() {
    GoodListStore.unlisten(this.onChange);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.params, this.props.params)) {
      GoodListActions.getGoods(this.props.params);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let GoodsList = this.state.Goods.map((Good, index) => {
      return (
        <div key={Good.GoodId} className='list-group-item animated fadeIn'>
          <div className='media'>
            <span className='position pull-left'>{index + 1}</span>
            <div className='pull-left thumb-lg'>
              <Link to={'/Goods/' + Good.GoodId}>
                <img className='media-object' src={'http://image.eveonline.com/Good/' + Good.GoodId + '_128.jpg'} />
              </Link>
            </div>
            <div className='media-body'>
              <h4 className='media-heading'>
                <Link to={'/Goods/' + Good.GoodId}>{Good.name}</Link>
              </h4>
              <small>Race: <strong>{Good.race}</strong></small>
              <br />
              <small>Bloodline: <strong>{Good.bloodline}</strong></small>
              <br />
              <small>Wins: <strong>{Good.wins}</strong> Losses: <strong>{Good.losses}</strong></small>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='container'>
        <div className='list-group'>
          {GoodsList}
        </div>
      </div>
    );
  }
}

export default GoodList;