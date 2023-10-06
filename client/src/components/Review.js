import React, { useState,useEffect } from "react";

function Review({reviewData}){
    const {review, date_created, user_id} = reviewData
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch(`/user/${user_id}`)
        .then((r) => r.json())
        .then((data) => setUser(data))
    }, [user_id])
    console.log(user)
    console.log(review, date_created.slice(0, 10))

    return(
        <>
        {review ? 
                (<div className="review_card">
                    <h3>User: {user.username}</h3>
                    <p>{review}</p>
                    <p><b>Date Created:</b> {date_created.slice(0,10)}</p>
                </div>) 
            :  
            (<div className="review_card">
                <h2>No reviews yet!</h2>
            </div>)}
        </>
    )
}

export default Review;