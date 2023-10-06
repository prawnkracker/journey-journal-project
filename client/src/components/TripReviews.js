import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";

function TripReviews(){
    const [reviews, setReviews] = useState([])
    const [trip, setTrip] = useState({})
    const { id } = useParams()
    
    useEffect(() => {
        fetch(`/trip_reviews/${id}`)
        .then((r) => r.json())
        .then((reviews) => setReviews(reviews));

        fetch(`/trip/${id}`)
        .then((r) => r.json())
        .then((tripData) => setTrip(tripData))
    }, [id]);

    if (reviews.length > 0){
    
    return (
        <div className="trip-reviews-card">
            <h1>Destination: {trip.destination}</h1>
            <img src={trip.trip_image_url} alt='Destination'/>
            <h2>Approximate Cost: ${trip.approximate_cost}</h2>
            <p><b>Description:</b> {trip.description}</p>
            <h2>Reviews:</h2>
            {reviews.map((review) => {
                return <Review 
                key={review.id}
                reviewData={review}
                />}
            )}
        </div>
    )}
    else {
        return(
            <div className="trip-reviews-card">
            <h1>Destination: {trip.destination}</h1>
            <img src={trip.trip_image_url} alt='Destination'/>
            <h2>Approximate Cost: ${trip.approximate_cost}</h2>
            <p><b>Description:</b> {trip.description}</p>
            <h2>No reviews yet!</h2>
            </div>
        )
    }
}

export default TripReviews;