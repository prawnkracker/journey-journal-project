import React, { useState, useEffect } from "react";
import Review from "./Review";

function UserPage({currentUser, trips}){
    const [reviews, setReviews] = useState([])
    
    useEffect(() => {
        fetch(`/${currentUser.id}/reviews`)
        .then((r) => r.json())
        .then((reviews) => setReviews(reviews))

    }, [])

    return (
        <div className="user-card">
        <img src={`${currentUser.image_url}`} alt="User avatar"/>
        <h1>{currentUser.username}</h1>
        <p>{currentUser.bio}</p>
        <h2>Reviews:</h2>
        {reviews.map((review) => {
            return (
            <Review
            key={review.id}
            reviewData={review}
            currentUser={currentUser}
            trips={trips}
            />
        )})}
        </div>
    )
}

export default UserPage