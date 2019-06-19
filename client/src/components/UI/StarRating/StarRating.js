import React, { useState } from "react";
import axios from "axios";

const starRating = props => {
  const [rating, ratingHandler] = useState(props.rating || null);
  const [stashedRating, stashedRatingHandler] = useState(null);
  const [message, toggleMassage] = useState(null);

  const rate = i => {
    axios.post('/api' + props.entityURL + '/rating', { rating: i })
      .then(res => {
        ratingHandler(res.data.rating);
        stashedRatingHandler(res.data.rating);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const star_over = i => {
    stashedRatingHandler(rating);
    ratingHandler(i);
  }

  const star_out = () => {
    ratingHandler(stashedRating)
  }

  const messageOn = () => {
    toggleMassage('Only members can rating!')
  }

  const messageOff = () => {
    toggleMassage(null)
  }

  let stars = [];
  for (let i = 1; i <= 5; i++) {
    let classRating = "star-rating__star";

    if (rating >= i && rating != null) {
      classRating += " is-selected";
    }
    if (props.authUser) {
      stars.push(
        <label
          key={i}
          className={classRating}
          onClick={() => rate(i)}
          onMouseOver={() => star_over(i)}
          onMouseOut={star_out}
        >
          ★
        </label>
      );
    } else {
      stars.push(
        <label
          key={i}
          className={classRating}
          onMouseOver={messageOn}
          onMouseOut={messageOff}
        >
          ★
        </label>
      );
    }
  }
  return (
    <div className="star-rating">
      {stars}
      <span className="star-rating-message">{message}</span>
    </div>
  )
}

export default starRating;
