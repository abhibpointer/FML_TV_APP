import React, { Component } from 'react';
import Slider from 'react-slick';
import CardType1 from './CardType1.js';
import CardType2 from './CardType2.js';
import CardType3 from './CardType3.js';
import CardType4 from './CardType4.js';
import CardType5 from './CardType5.js';
import { getSlideTime } from '../common';
import '../../styles/common.css';
import './style.css';

const _ = require('underscore');
let availableCat = [];
class PriceList extends Component {
	constructor(props) {
        super(props);
        this.state = {
            visible: true,
            items: [],
            items1: [],
            availableCat: [],
        }
    }

    componentDidMount() {
    };

    renderSliderItem = (items) => {
        const { categories } = this.props;
        const elements = [];
        availableCat = [];
        _.each(categories, (cat,i) => {            
            const data = _.where(cat.data, { available: true });
            if (data.length > 0) {
                availableCat.push(cat);
            }
            if (cat.card_type === 1 && data.length > 0){
                elements.push(<div key={i}><CardType1 items={cat.data} /></div>)
            } else if (cat.card_type === 2 && data.length > 0){
                elements.push(<div key={i}><CardType2 items={cat.data} /></div>)
            } else if (cat.card_type === 3 && data.length > 0){
                elements.push(<div key={i}><CardType3 items={cat.data} /></div>)
            } else if (cat.card_type === 4 && data.length > 0){
                elements.push(<div key={i}><CardType4 items={cat.data} /></div>)
            } else if (cat.card_type === 5 && data.length > 0){
                elements.push(<div key={i}><CardType5 items={cat.data} /></div>)
            }
        });
        return elements;
    }

    afterChange(e){
        if(availableCat[e]){
            const avlData = _.where(availableCat[e].data, { available: true });
            // console.log("length: ",avlData.length);
            // console.log("time: ", getSlideTime(avlData.length));
            setTimeout(() => {
                if(this.slider){
                    this.slider.slickNext();
                }
            }, getSlideTime(avlData.length));
        }else{
            this.slider.slickNext();
        }
        this.props.onSlideChange(e, availableCat);
    }

    render() {
        const { categories, onSlideChange } = this.props;
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            autoplaySpeed: 10000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            arrows: false,
            swipeToSlide: false,
            swipe: false,
            afterChange: this.afterChange.bind(this)
        };

        return (
            <div className='pricelist-wrapper'>
                <Slider ref={c => this.slider = c } {...settings}>
                    {this.renderSliderItem(categories)}
                </Slider>
            </div>
        );
    }
}

export default PriceList;

