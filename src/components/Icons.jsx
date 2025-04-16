import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type, saved }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case 'save':
      imageSource = require('../assets/icons/save.png');
      saved && iconStyle.push(styles.saved);
      break;
    case 'share':
      imageSource = require('../assets/icons/share.png');
      break;
    case 'surprise':
      imageSource = require('../assets/icons/surprise.png');
      break;
    case 'tick':
      imageSource = require('../assets/icons/tick.png');
      break;
    case 'pin':
      imageSource = require('../assets/icons/pin.png');
      break;
    case 'menu':
      imageSource = require('../assets/icons/menu.png');
      break;
    case 'close':
      imageSource = require('../assets/icons/close.png');
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({

  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  saved: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#dabc67',
  },

});

export default Icons;
