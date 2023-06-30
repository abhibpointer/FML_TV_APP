import React, { useEffect, useState } from 'react';
import Categories from '../Categories';
import PriceList from '../PriceList';
import './style.css';
import axios from 'axios';
import _ from 'underscore';

const { REACT_APP_ENDPOINT } = process.env;

const Home = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('BEER');
  const [outletId, setOutletId] = useState(null);

  useEffect(() => {
    const id = window.localStorage.getItem('outletId');
    if (id) {
      setOutletId(id);
      initSocket(id);
    }
  }, []);

  const initSocket = (id) => {
    const { socket } = this.props;
    socket.emit('outletId', id);
    socket.on('categories', (msg) => {
      setCategories(msg.arr);
    });
    socket.on('drinks', (msg) => {
      makeCategories(msg);
    });
    socket.on('pricechanged', (msg) => {
      if (msg.outletId && msg.outletId.toString() === outletId.toString()) {
        updateCategories(msg);
      }
    });
  };

  const makeCategories = (data) => {
    if (!_.isEmpty(categories)) {
      setData(data);
      const updatedCategories = categories.map((cat) => {
        const thisData = _.filter(data.arr, (d) => cat.name === d.category);
        return {
          ...cat,
          data: thisData,
          card_type: 1,
        };
      });
      setCategories(updatedCategories);
    }
  };

  const updateCategories = (data) => {
    const updatedCategories = makeCategories(data);
    if (updatedCategories) {
      data.arr.forEach((d) => {
        const thisData = _.find(updatedCategories, (cat) => cat.name === d.category);
        const thisDrink = _.find(thisData.data, (td) => td.drinkId === d.drinkId);
        thisDrink.runningPrice = d.runningPrice;
      });
      setCategories(updatedCategories);
    }
  };

  const onSlideChange = (e, availableCat) => {
    const updatedCategories = makeCategories(data);
    const thisCat = availableCat[e];
    if (thisCat) {
      setCurrentCategory(thisCat.mainCategory);
    }
  };

  const handleLogin = (userName, password) => {
    axios
      .post(`${REACT_APP_ENDPOINT}/banner`, {
        userName: userName,
        password: password,
      })
      .then((response) => {
        if (response.data.success) {
          const outletId = response.data.data.outletId.toString();
          setOutletId(outletId);
          setCurrentUserLocally(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logoutUser = () => {
    window.localStorage.removeItem('outletId');
    setOutletId(null);
  };

  const setCurrentUserLocally = (data) => {
    window.localStorage.setItem('outletId', data.outletId.toString());
    initSocket(data.outletId);
  };

  if (_.isEmpty(outletId)) {
    return (
      <div className=''>
        <Categories categories={categories} currentCategory={currentCategory} logoutUser={logoutUser} />
        <div className='content-area'>
          <PriceList categories={categories} onSlideChange={onSlideChange} />
        </div>
      </div>
    );
  }
};

export default Home;
