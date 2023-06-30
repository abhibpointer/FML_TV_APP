import React, { Component } from 'react';
import '../../lib/bootstrap/css/bootstrap.min.css';
import { roundOf } from '../common';
import '../../styles/common.css';
import './style.css';

const _ = require('underscore');


class CardType1 extends Component {
	constructor(props) {
        super(props);
        this.state = {
            visible: true,
            items: []
        }
    }

    componentDidMount() {
        const { items } = this.props;
        this.setState({ items });
    }

    componentWillReceiveProps(props) {
        const { items } = this.props;
        this.setState({ items });
    }

    renderList(items){
        return items.map((item, idx) => 
            <li key={`li_${idx}`} className='card-item WickedGrit'>
                <div className='card-item-name width-300'>{item.name}</div>
                <div className='card-item-price1'>{roundOf(item.runningPrice)}</div>
            </li>
        );
    }

    renderMultipleLists(items){
        var sets = [], chunk;
        items = _.where(items,{available: true});

        while (items.length > 0) {
          chunk = items.splice(0,8);
          sets.push(chunk);
        }
        return sets.map((set, idx) => 
            <ul key={`ul_${idx}`} className='list-unstyled card-list'>
                {this.renderList(set)}
            </ul>
        );
    }

    printCategoryName = (items) => {
        if(items[0]){return items[0].category}
    }

    render() {
        return (
            <div className='card-type1-wrapper'>
                <div className='side-list-wrapper'>
                    <div className='side-title WickedGrit'>
                        {this.printCategoryName(this.state.items)}
                    </div>
                    <div className='card-container'>
                        {this.renderMultipleLists(this.state.items)}
                    </div>
                </div>
            </div>
        );
    }
}

export default CardType1;

