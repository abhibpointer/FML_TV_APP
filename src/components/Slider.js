import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const { REACT_APP_ENDPOINT } = process.env;

const Slider = () => {
  const [slider, setSlider] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRefs = useRef([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    const getSlider = async () => {
      try {
        const response = await Axios.get(
          `${REACT_APP_ENDPOINT}/getBannerList?outlet_id=${2}`);
        const { data } = response.data;
        setSlider(data.banner);
      } catch (error) {
        console.log(error);
      }
    };

    getSlider();
  }, []);

  useEffect(() => {
    if (slider.length > 0) {
      startSlider();
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [slider]);

  const startSlider = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === slider.length - 1 ? 0 : prevIndex + 1
      );
    }, getSlideInterval(activeIndex));
  };

  const getSlideInterval = (index) => {
    const slide = slider[index];
    if (slide && slide.number_of_sec) {
      return slide.number_of_sec * 1000;
    }
    return 5000; // Default interval of 5000 milliseconds (5 seconds)
  };

  const adjustSlideSize = (slide) => {
    const aspectRatio =
      slide.is_image_video === 1
        ? slide.image_width / slide.image_height
        : slide.video_width / slide.video_height;

    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    let width;
    let height;

    if (aspectRatio > containerWidth / containerHeight) {
      width = containerWidth;
      height = containerWidth / aspectRatio;
    } else {
      width = containerHeight * aspectRatio;
      height = containerHeight;
    }

    return {
      width: `${width}px`,
      height: `${height}px`,
    };
  };

  const handleSlideLoaded = (index, slide) => {
    slideRefs.current[index] = slide;
  };

  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slider.length);
    }, getSlideInterval(activeIndex));
  }, [activeIndex, slider.length]);

  
  return (
    <div>
      <h3 style={{fontSize: '12px'}}>{new Date().getSeconds()}</h3> {/*Just for checking how much second each slide take*/} 
      {slider.length > 0 ? (
        <Carousel
          selectedItem={activeIndex}
          onChange={handleSlideLoaded}
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={getSlideInterval(activeIndex)}
        >
          {slider.map((slide, index) => (
            <div key={slide._id}>
              {slide.is_image_video === 1 ? (
                <img
                  className="d-block"
                  src={`${REACT_APP_ENDPOINT}${slide.image_video_path}`}
                  alt="Slide"
                  style={{ ...adjustSlideSize(slide), width: '100%' }}
                />
              ) : (
                <video
                  className="d-block"
                  autoPlay
                  loop
                  muted
                  src={`${REACT_APP_ENDPOINT}${slide.image_video_path}`}
                  style={{ ...adjustSlideSize(slide), width: '100%' }}
                />
              )}
            </div>
          ))}
        </Carousel>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Slider;
