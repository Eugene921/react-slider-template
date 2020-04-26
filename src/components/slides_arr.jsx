import React from 'react';

const SlidesArr = ({ style, slides }) => {
  return slides.map((slide, i) => {
    return <div style={{ ...style, backgroundImage: `url(${slide})` }} className="slide" key={i.toString()} />;
  });
};

export default SlidesArr;
