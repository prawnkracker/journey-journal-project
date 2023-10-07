import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function Review({reviewData, currentUser, trips}){
    // const {review, date_created, user_id, trip_id} = reviewData
    const [user, setUser] = useState({})
    const [trip, setTrip] = useState({})
    const [showForm, setShowForm] = useState('none')
    const [review, setReview] = useState(reviewData)
    const [form, setForm] = useState({
        review:review.review,
        trip_id:review.trip_id
    })

    useEffect(() => {
        fetch(`/user/${review.user_id}`)
        .then((r) => r.json())
        .then((data) => setUser(data))

        fetch(`/trip/${review.trip_id}`)
        .then((r) => r.json())
        .then((data) => setTrip(data))
    }, [review.user_id, review.trip_id])

    function handleChange(e){
        const {name, value} = e.target

        setForm({
            ...form,
            [name]:value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        const reviewInfo={
            review:form.review,
            trip_id:form.trip_id
        }
        fetch(`/${currentUser.id}/review/${review.id}`, {
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(reviewInfo)
        })
        .then((r)=> r.json())
        .then((data) => setReview(data))

        setForm({
            review:review.review,
            trip_id:review.trip_id
        })
        setShowForm('none')
    }

    return (
        <div className="review-card">
            <h3>User:</h3> 
            <Link to={`/userreviews/${review.user_id}`}>
                {user.username}
            </Link>
            <p>{review.review}</p>
            <p><b>Date Created:</b> {review.date_created.slice(0,10)}</p>
            <p><em><u>Trip:</u></em> {trip.id}. {trip.destination}</p>
            {currentUser.id === review.user_id && (
                <button onClick={() => setShowForm('block')}>Edit Review</button>
            )}
            <form onSubmit={handleSubmit} style={{display:showForm}}>
                <h4>Review:</h4>
                <input 
                    type="text"
                    name="review"
                    id="review"
                    autoComplete="off"
                    value={form.review}
                    onChange={handleChange}
                />
                <h4>Trip ID</h4>
            <select 
                id='trip_id' 
                name='trip_id' 
                onChange={handleChange} 
                value={form.trip_id}>
                {trips.map((trip) => {
                    return <option value={trip.id} key={trip.id}>{trip.id}</option>
                })}
            </select>
                <button onClick={()=> setShowForm('none')}>Close</button>
                <button type="submit">Update Review</button>
            </form>
        </div>)
}

export default Review;