import React, { Component } from 'react';
import '../../lib/bootstrap/css/bootstrap.min.css';
import { roundOf } from '../common';
import '../../styles/common.css';
import './style.css';
import './CardType4.css';
const _ = require('underscore');


class CardType4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            items1: [],
            items2: []
        }
    }

    componentDidMount() {
    };

    componentWillReceiveProps(props) {
        const poss_cat = _.uniq(_.pluck(this.props.items, 'category'));
        let items1 = _.filter(this.props.items, (item) => { return item.category === poss_cat[0] && item.available } );
        let items2 = _.filter(this.props.items, (item) => { return item.category === poss_cat[1] && item.available } );

        if(items1[0] && items1[0].category === 'WINES'){
            items1 = _.where(this.props.items, {category: 'WINES', category: 'IMPORTED WINE'});
        }
        if(items2[0] && items2[0].category === 'WINES'){
            items2 = _.filter(this.props.items, (item) => { return item.category === 'WINES' || item.category === 'IMPORTED WINE' });
        }
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
            <div className='multiple-card-wrapper-4'>
                <div className='card-type1-wrapper card-type4-wrapper'>
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
                <div className='card-type1-wrapper card-type4-wrapper'>
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

export default CardType4;

