import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import HotelItem from '../Hotels/HotelItem';
import ReviewItem from './ReviewItem';
import HotelsContext from '../Hotels/HotelsContext';

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
  const [reviews, setReviews] = useState([])
  const { hotels } = useContext(HotelsContext)

  const hotel = hotels && hotels.find(h => h.id.toString() === match.params.id)

  useEffect(() => {
    if (hotel) {
      fetch(`https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${hotel.id}/reviews`)
      .then(response => response.json())
      .then(data => {
        setReviews(data)
        setLoading(false)
      })
      .catch(() => setError(true));
    }
  }, [hotel])

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
