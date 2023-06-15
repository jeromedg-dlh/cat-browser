import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CustomCard from '../../components/card';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Cat, CatInfo } from '../../types';
import styles from './cat-details.module.css';

interface ISingleCat extends CatInfo {
  breeds: Cat[]
}

export const CatDetails: React.FC = () => {
  const [cat, setCat] = useState<ISingleCat>();
  const { id } = useParams();

  useEffect(() => {
    axios(`https://api.thecatapi.com/v1/images/${id}`)
    .then(response => {
      setCat(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert('Apologies but we could not load new cats for you at this time! Miau!')
    })
  },[id, setCat]);

  return (
    <div className={styles.wrapper}>
      {cat &&
        <CustomCard
          header={
            <Link to={`/?breed=${cat.breeds[0].id}`}>
              <Button variant="info" className={styles.backButton}>Back</Button>
            </Link>
          }
          key={id}
          imgSrc={cat.url}
        >
          <h3>{cat.breeds[0].name}</h3>
          <h4>Origin: {cat.breeds[0].origin}</h4>
          <h5>{cat.breeds[0].temperament}</h5>
          <p>{cat.breeds[0].description}</p>
        </CustomCard>
      }
    </div>
  );
}