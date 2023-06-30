import React, { useState, useEffect } from 'react';
import '../../styles/common.css';
import './style.css';
import axios from 'axios';
const { REACT_APP_ENDPOINT } = process.env;
const _ = require('underscore');

const Categories = (props) => {
  const [slider, setSlider] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('BEER');

  useEffect(() => {
    const categories = _.uniq(_.pluck(props.categories, 'mainCategory'));
    setCategories(categories);
    setCurrentCategory(props.currentCategory);
  }, [props.categories, props.currentCategory]);

  useEffect(() => {
    getSlider();
  }, []);

  const getSlider = async () => {
    try {
      const response = await axios.get(`${REACT_APP_ENDPOINT}/getBanner?outlet_id=2`);
      const data = response.data;
      console.log(data);
      setSlider(data.banner);
    } catch (error) {
      console.error(error);
    }
  };

  const renderCategoryIcon = (category) => {
    let icon = require(`../../images/categories_icons/${category.replace(/ /g, '_').toLowerCase()}_transparent.png`);
    if (currentCategory === category) {
      icon = require(`../../images/categories_icons/${category.replace(/ /g, '_').toLowerCase()}_full.png`);
    }
    return icon.default; // Add '.default' to access the image source correctly
  };

  const renderCategoryName = (category) => {
    if (currentCategory === category) {
      return (
        <div className='categories-item-name active WickedGrit'>{category}</div>
      );
    }
    return (
      <div className='categories-item-name WickedGrit'>{category}</div>
    );
  };

  const selectCategory = (category) => {
    setCurrentCategory(category);
  };

  const renderCategoryList = () => {
    return categories.map((category, idx) => (
      <div key={`category_${idx}`} className='categories-item-wrapper' onClick={() => selectCategory(category)}>
        <div className='categories-item-icon'>
          <img alt={category} src={renderCategoryIcon(category)} />
        </div>
        {renderCategoryName(category)}
      </div>
    ));
  };

  const renderSliderItems = () => {
    if (slider && slider.length > 0) {
      return slider.map((sliderItem, index) => (
        <div className={index === 0 ? 'carousel-item active' : 'carousel-item'} key={sliderItem._id} style={{ width: 500, height: 600 }}>
          <img src={`${REACT_APP_ENDPOINT}${sliderItem.image_video_path}`} className='d-block w-100' alt='...' />
        </div>
      ));
    } else {
      return null; // or you can render a loading state or fallback UI
    }
  };

  return (
    <div className='categories-wrapper'>
      <div className='categories-list'>{renderCategoryList()}</div>

      <div id='carouselExampleControls' className='carousel slide' data-ride='carousel'>
        <div className='carousel-inner'>
          {renderSliderItems()}
        </div>
      </div>
    </div>
  );
};

export default Categories;
