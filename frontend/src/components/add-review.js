import React, {useState} from "react";
import RestaurantDataService from "../services/restaurant";
import { Link, useLocation, useParams } from "react-router-dom";

function AddReview({user}) {
  //console.log("PROPS",user,state);
  const location = useLocation();
  const params = useParams();
  let initialReviewState = "";
  console.log("USE LOCATION",location);
  let editing = false;

  if (location.state && location.state.review){
    editing = true;
    
    initialReviewState = location.state.review.text;
  }

   const [review, setReview] = useState(initialReviewState);
   console.log("REVIEW", review);
   const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: user.name,
      user_id: user.id,
      restaurant_id: params.id
    };

    if (editing) {
      data.review_id = location.state.review._id;
      RestaurantDataService.updateReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    else {
      RestaurantDataService.createReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
  
  return (
    <div>
      {editing ? (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Link to={"/restaurants/" + params.id} className="btn btn-outline-secondary">
                Back to Restaurant
              </Link>
            </div>
          ) : (
            <div>
              <div className ="form-group">
                <label htmlFor="description">{editing ? "Edit" : "Create"} Review</label>
                <input type="text" className="form-control" id="text" required value={review} onChange={handleInputChange} name="text" />
              </div>
              <button onClick={saveReview} className="btn btn-success">Submit</button>
            </div>
          )}
        </div>
      ) : (
        <div>

        </div>
      )}
    </div>
  );
}

export default AddReview;