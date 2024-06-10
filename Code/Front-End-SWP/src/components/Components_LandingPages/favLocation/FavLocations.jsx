import React from 'react';
import './favLocation.css';
import dataLocation from './favLocationData';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

function FavLocations() {
  const data = dataLocation;

  const splideOptions = {
    type: 'loop',
    drag: 'free',
    perPage: 6,
    interval: 2500,
    autoplay: true,
    pagination: false,
    gap: 60,
    autoScroll: {
      speed: 500,
    },
  };

  return (
    <div className="fav__container">
      <Splide options={splideOptions}>
        {data.map((item) => (
          <SplideSlide className="fav__location__item" key={item.id}>
            <div className="fav__card">
              <img className="fav__img" src={item.img} alt={item.name} />
              <h2 className="fav__name">{item.name}</h2>
              <p className="fav__des">{item.desc}</p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
export default FavLocations;
