import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import HotelItem from '../Hotels/HotelItem';
import ReviewItem from './ReviewItem';

const ReviewsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const Detail = ({ match, history }) => {
  // Get this information from the API
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hotel, setHotel] = useState(false)
  const [reviews, setReviews] = useState([])
  
  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${match.params.id}`)
    .then(response => response.json())
    .then(data => {
      setHotel(data)
      setLoading(false)
    })
    .catch(() => setError(true));
  }, [match.params.id])

  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${hotel.id}/reviews`)
    .then(response => response.json())
    .then(data => {
      setReviews(data)
    })
    .catch(() => setError(true));
  }, [hotel.id])

  return !loading && !error ? (
    <>
      {history && hotel && (
        <SubHeader
          goBack={() => history.goBack()}
          title={hotel.title}
          openForm={() => history.push(`${match.url}/new`)}
        />
      )}
      <HotelItem data={hotel} />

      <h3>Reviews:</h3>
      <ReviewsWrapper>
        {reviews && reviews.length && reviews.map(review => {
          return <ReviewItem data={review} />
        })}
      </ReviewsWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : error}</Alert>
  );
};

export default Detail;
