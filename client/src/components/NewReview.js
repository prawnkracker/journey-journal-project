import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewReview({user}){
    const [form, setForm] = useState({
        review:'',
        trip_id:''
    })
    const history = useHistory()

    function handleChange(e){
        const {name, value} = e.target

        setForm({
            ...form,
            [name]:value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        const reviewInfo = {
            review: form.review,
            trip_id: form.trip_id
        }

        fetch(`/${user.id}/reviews`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(reviewInfo)
        })
        .then((r) => {
            if (r.ok){
                r.json().then(() => history.push(`/userreviews/${user.id}`))
            }
        })
        setForm({
            review:'',
            trip_id:''
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h4>Review:</h4>
            <input
                type="text"
                placeholder="Review..."
                name="review"
                id="review"
                autoComplete="off"
                value={form.review}
                onChange={handleChange}
            />
            <h4>Trip ID:</h4>
            <input
                type="text"
                placeholder="Trip ID..."
                name="trip_id"
                id="trip_id"
                autoComplete="off"
                value={form.trip_id}
                onChange={handleChange}
            />
            <button type="submit">Add review</button>
        </form>
    )
}

export default NewReview;