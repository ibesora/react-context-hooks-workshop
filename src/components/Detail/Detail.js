import React, { useEffect } from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import HotelItem from '../Hotels/HotelItem';
import ReviewItem from './ReviewItem';
import { useHotelsContext } from '../Hotels/HotelsContext';

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
  const { loading, error, hotels, reviews, getHotelReviews } = useHotelsContext()
  const hotel = hotels && hotels.find(h => h.id.toString() === match.params.id)

  useEffect(() => {
    if (hotel) {
      getHotelReviews(hotel.id)
    }
  }, [hotel, getHotelReviews])

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
          return <ReviewItem key={review.id} data={review} />
        })}
      </ReviewsWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : error}</Alert>
  );
};

export default Detail;
