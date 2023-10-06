import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function Review({reviewData, currentUser}){
    const {review, date_created, user_id, trip_id} = reviewData
    const [user, setUser] = useState({})
    const [trip, setTrip] = useState({})

    useEffect(() => {
        fetch(`/user/${user_id}`)
        .then((r) => r.json())
        .then((data) => setUser(data))

        fetch(`/trip/${trip_id}`)
        .then((r) => r.json())
        .then((data) => setTrip(data))
    }, [user_id, trip_id])

    return (
        <div className="review-card">
            <h3>User:</h3> 
            <Link to={`/userreviews/${user_id}`}>
                {user.username}
            </Link>
            <p>{review}</p>
            <p><b>Date Created:</b> {date_created.slice(0,10)}</p>
            <p><em>Trip:</em> {trip.destination}</p>
            {currentUser.id === user_id && (
                <button>Edit Review</button>
            )}
        </div>)
}

export default Review;