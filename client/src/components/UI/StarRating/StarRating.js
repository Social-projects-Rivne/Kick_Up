import React from "react";

const starRating = props => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      let klass = "star-rating__star";

      if (props.rating >= i && props.rating != null) {
        klass += " is-selected";
      }

      stars.push(
        <label key={i} className={klass} >
          ★
        </label>
      );
    }
    return <div className="star-rating">{stars}</div>;
}

export default starRating;
