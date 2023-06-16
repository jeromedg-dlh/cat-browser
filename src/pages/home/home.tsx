import React, { useEffect, useCallback, ChangeEvent, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import styles from './home.module.scss';
import { ICatImage } from '../../interfaces';
import { CustomCard } from '../../components';
import { useCatsContext } from '../../context/CatsContext';

const ITEMS_PER_PAGE = 10;

export const Home: React.FC = () => {
  const {
    breeds,
    setBreeds,
    isLoadingBreeds,
    setIsLoadingBreeds,
    isLoadingCats,
    setIsLoadingCats,
    selectedBreedId,
    setSelectedBreedId,
    cats,
    setCats,
    page,
    setPage,
    noMoreData,
    setNoMoreData,
  } = useCatsContext();

  const search = useLocation().search;
  const breed = new URLSearchParams(search).get('breed');

  useEffect(() => {
    setIsLoadingBreeds(true);

    axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then(response => {
        setBreeds(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Apologies but we could not load new cats for you at this time! Miau!');
      })
      .finally(() => {
        setIsLoadingBreeds(false);
      });
  }, [setBreeds, setIsLoadingBreeds]);

  useEffect(() => {
    if (!selectedBreedId) return;

    setIsLoadingCats(true);

    axios
      .get(
        `https://api.thecatapi.com/v1/images/search?page=${page}&limit=${ITEMS_PER_PAGE}&breed_id=${selectedBreedId}`
      )
      .then(response => {
        setCats(prevState => {
          const newCats: ICatImage[] = response.data.filter(
            (cat: ICatImage) => !prevState?.find(oldCat => oldCat.id === cat.id)
          );

          if (newCats.length === 0) setNoMoreData(true);

          return [...(prevState ?? []), ...newCats];
        });
      })
      .catch((error) => {
        console.error(error);
        alert('Apologies but we could not load new cats for you at this time! Miau!');
      })
      .finally(() => {
        setIsLoadingCats(false);
      });
  }, [selectedBreedId, page, setCats, setNoMoreData, setIsLoadingCats]);

  const onChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const selectedBreed = breeds?.find(breed => breed.name === event.target.value);

    setCats([]);
    setNoMoreData(false);
    setSelectedBreedId(selectedBreed?.id);
  }, [breeds, setCats, setNoMoreData, setSelectedBreedId]);

  const loadMore = (e: MouseEvent) => {
    e.preventDefault();
    setPage(page + 1);
  };

  useEffect(() => {
    if (!breed) return;

    setSelectedBreedId(breed);
  }, [breed, setSelectedBreedId]);

  return (
    <div className={styles.wrapper}>
      <div>
        <Form.Select
          disabled={isLoadingBreeds}
          onChange={e => onChange(e)}
          value={breeds?.find(breed => breed.id === selectedBreedId)?.name}
        >
          <option key="blankChoice">Select a breed</option>
          {breeds?.map(breed => (
            <option key={breed.id}>{breed.name}</option>
          ))}
        </Form.Select>
      </div>
      {!selectedBreedId && <p>No cats available</p>}
      {(cats ?? []).length > 0 && (
        <div className={styles.cats}>
          <Row xs={4} md={4} className="g-4">
            {cats?.map((cat, idx) => (
              <Col key={idx}>
                <CustomCard key={cat.id}>
                  <div className="d-flex flex-column gap-4">
                    <img
                      className={styles.cat_image}
                      key={cat.id}
                      src={cat.url}
                      alt={cat.id}
                      height={cat.height}
                      width={cat.width}
                    />
                    <Link to={`${cat.id}`}>
                      <Button variant="info">View details</Button>
                    </Link>
                  </div>
                </CustomCard>
              </Col>
            ))}
          </Row>
        </div>
      )}
      <div>
        {!noMoreData && (
          <Button onClick={e => loadMore(e)} disabled={!selectedBreedId || isLoadingCats}>
            Load more
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;