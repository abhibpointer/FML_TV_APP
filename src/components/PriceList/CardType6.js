import React, { Component } from 'react';
import '../../lib/bootstrap/css/bootstrap.min.css';
import { roundOf } from '../common';
import '../../styles/common.css';
import './style.css';
import './CardType6.css';

class CardType6 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        }
    }

    componentDidMount() {
        
    };

    renderList(items){
        return _.where(items,{available: true}).map((item, idx) => 
            <li className='card-item WickedGrit'>
                <div className='card-item-name'>{item.name}</div>
                <div className='card-item-price1'>{item.pint}</div>
            </li>
        );
    }

    render() {
        const { items, items1 } = this.props;
        return (
            <div className='card-type1-wrapper card-type6-wrapper'>
                <div className='side-list-wrapper'>
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

export default CardType6;

