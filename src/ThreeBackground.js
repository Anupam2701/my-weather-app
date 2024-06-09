// src/ThreeBackground.js
import React from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${({ weather }) =>
    weather === 'Clear'
      ? 'url("https://source.unsplash.com/featured/?sunny")'
      : weather === 'Clouds'
      ? 'url("https://source.unsplash.com/featured/?cloudy")'
      : weather === 'Rain'
      ? 'url("https://source.unsplash.com/featured/?rainy")'
      : 'url("https://source.unsplash.com/featured/?weather")'};
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
  z-index: -1;
`;

const ThreeBackground = ({ weather }) => {
  return <BackgroundContainer weather={weather} />;
};

export default ThreeBackground;
