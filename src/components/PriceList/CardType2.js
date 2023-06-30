import React, { Component } from 'react';
import '../../lib/bootstrap/css/bootstrap.min.css';
import { roundOf } from '../common';
import '../../styles/common.css';
import './style.css';
import './CardType2.css';
const _ = require('underscore');


class CardType2 extends Component {
	constructor(props) {
        super(props);
        this.state = {
            visible: true,
        }
    }

    componentDidMount() {
        
    };

    renderList(items){
        return items.map((item, idx) => 
            <li className='card-item WickedGrit'>
                <div className='card-item-name'>{item.name}</div>
                <div className='card-item-price1'>{roundOf(item.runningPrice)}</div>
                <div className='card-item-price2'>{item.name}</div>
                <div className='card-item-price2'>{roundOf(item.runningPrice)}</div>
            </li>
        );
    }

    printCategoryName = (items) => {
        if(items[0]){return items[0].category}
    }

    render() {
        let { items } = this.props;
        items = _.where(items,{available: true});
        return (
            <div className='card-type1-wrapper card-type2-wrapper'>
                <div className='side-list-wrapper'>
                    <div className='side-title WickedGrit'>
                        {this.printCategoryName(items)}
                    </div>
                    <div className='card-container'>
                        <ul className='list-unstyled card-list'>
                            {this.renderList(items)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardType2;

