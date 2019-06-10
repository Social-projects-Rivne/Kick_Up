import React, { useState } from "react";
import axios from "axios";

const starRating = props => {
  const [rating, ratingHandler] = useState(props.rating || null);
  const [stashedRating, stashedRatingHandler] = useState(null);

  const rate = i => {
    axios.post('/api' + props.entityURL + '/rating',{ rating: i })
    .then(res=> {
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

  let stars = [];
  for (let i = 1; i <= 5; i++) {
    let klass = "star-rating__star";

    if (rating >= i && rating != null) {
      klass += " is-selected";
    }

    stars.push(
      <label 
        key={i} 
        className={klass}
        onClick={() => rate(i)}
        onMouseOver={() => star_over(i)}
        onMouseOut={star_out}
      >
        ★
      </label>
    );
  }
  return <div className="star-rating">{stars}</div>;
}

export default starRating;
