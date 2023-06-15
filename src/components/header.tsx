import React from 'react';
import cat_vector from '../assets/cat.png';
import styles from './header.module.scss';

export const Header: React.FC = () => {
  return (
    <div>
      <img alt="cat" src={cat_vector} width={300}/>
      <h2 className={styles.title}>Cat Browser</h2>
    </div>
  );
}

export default Header;
