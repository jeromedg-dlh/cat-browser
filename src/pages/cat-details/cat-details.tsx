import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CustomCard } from '../../components';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { ISingleCat } from '../../interfaces';
import './cat-details.css';

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
    <div className="wrapper">
      {cat &&
        <CustomCard
          header={
            <Link to={`/?breed=${cat.breeds[0].id}`}>
              <Button variant="info" className="backButton">Back</Button>
            </Link>
          }
          key={id}
          imgSrc={cat.url}
        >
          <h3>{cat?.breeds?.[0]?.name ?? "No breed name"}</h3>
          <h4>Origin: {cat?.breeds?.[0]?.origin ?? "N/A"}</h4>
          <h5>{cat?.breeds?.[0]?.temperament ?? "No temperament available"}</h5>
          <p>{cat?.breeds?.[0]?.description ?? "No description available"}</p>
        </CustomCard>
      }
    </div>
  );
}