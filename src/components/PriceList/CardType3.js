import React, { Component } from 'react';
import '../../lib/bootstrap/css/bootstrap.min.css';
import { roundOf } from '../common';
import '../../styles/common.css';
import './style.css';
import './CardType3.css';
const _ = require('underscore');

class CardType3 extends Component {
	constructor(props) {
        super(props);
        this.state = {
            visible: true,
            items1: [],
            items2: []
        }
    }

    componentWillMount() {
    };

    componentWillReceiveProps(props) {
        const poss_cat = _.uniq(_.pluck(this.props.items, 'category'));
        const items1 = _.filter(this.props.items, (item) => { return item.category === poss_cat[0] && item.available });
        const items2 = _.filter(this.props.items, (item) => { return item.category === poss_cat[1] && item.available });
        this.setState({ items1, items2 });
    }

    renderList(items){
        return items.map((item, idx) => 
            <li className='card-item WickedGrit'>
                <div className='card-item-name'>{item.name}</div>
                <div className='card-item-price1'>{roundOf(item.runningPrice)}</div>
            </li>
        );
    }

    printCategoryName = (items) => {
        if(items[0]){return items[0].category}
    }

    render() {
        return (
            <div className='multiple-card-wrapper-3'>
                <div className='card-type1-wrapper card-type3-wrapper'>
                    <div className='side-list-wrapper'>
                        <div className='side-title WickedGrit'>
                            {this.printCategoryName(this.state.items1)}
                        </div>
                        <div className='card-container'>
                            <ul className='list-unstyled card-list'>
                                {this.renderList(this.state.items1)}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='card-type1-wrapper card-type3-wrapper'>
                    <div className='side-list-wrapper'>
                        <div className='side-title WickedGrit'>
                            {this.printCategoryName(this.state.items2)}
                        </div>
                        <div className='card-container'>
                            <ul className='list-unstyled card-list'>
                                {this.renderList(this.state.items2)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardType3;

