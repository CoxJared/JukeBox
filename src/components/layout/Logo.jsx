import React from 'react';
import logo from '../../images/logo.png';

const logoStyles = {
  container: {
    paddingLeft: 70
  },
  image: {
    width: 30
  },
  name: {
    color: '#b9b950',
    fontSize: 35,
    fontWeight: 500,
    // height: 40,
    padding: '0 0 50px 10px'
    // marginBottom: 10
  }
};

function Logo() {
  return (
    <div style={logoStyles.container}>
      <img src={logo} style={logoStyles.image} />
      <span style={logoStyles.name}>JukeBox</span>
    </div>
  );
}

export default Logo;
