import React from 'react';
import { Card, CardProps } from 'react-bootstrap';
import styles from './card.module.scss';

interface ICardProps extends CardProps {
  cardText?: string;
  imgSrc?: string;
  header?: JSX.Element;
}

export const CustomCard: React.FC<ICardProps> = ({
  title,
  cardText,
  imgSrc,
  header,
  children
}) => {
  return (
    <Card className={styles.card}>
      <Card.Header>{header}</Card.Header>
      <Card.Img variant="top" src={imgSrc} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {cardText}
        </Card.Text>
        {children}
      </Card.Body>
    </Card>
  );
}

export default CustomCard;