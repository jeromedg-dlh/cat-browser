import React from 'react';
import cat_vector from '../../assets/images/cat.png';
import './header.scss';

export const Header: React.FC = () => {
  return (
    <div>
      <img alt="cat" src={cat_vector} className="header_logo" />
      <h2 className="title">Cat Browser</h2>
    </div>
  );
}

export default Header;
