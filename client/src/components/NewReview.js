import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewReview({user, trips}){
    const [form, setForm] = useState({
        review:'',
        trip_id:1
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
        console.log(reviewInfo)
        setForm({
            review:'',
            trip_id:''
        })
    }

    return (
        <div className="new-review">
            <h1>Add a new review for a trip!</h1>
            <form onSubmit={handleSubmit}>
                <h4>Review:</h4>
                <input
                    type="text"
                    size='50'
                    placeholder="Review..."
                    name="review"
                    id="review"
                    autoComplete="off"
                    value={form.review}
                    onChange={handleChange}
                />
                <h4>Trip ID:</h4>
                <select id='trip_id' name='trip_id' onChange={handleChange} value={form.trip_id}>
                    {trips.map((trip) => {
                        return <option value={trip.id} key={trip.id}>{trip.id}</option>
                    })}
                </select>
                <br></br>
                <button type="submit">Add review</button>
            </form>
        </div>
    )
}

export default NewReview;