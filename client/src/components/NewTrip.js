import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewTrip(){
    const [form, setForm] = useState({
        destination: '',
        approximate_cost:'',
        description:'',
        trip_image_url:'',
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
        e.preventDefault();
        const tripInfo = {
            destination: form.destination,
            approximate_cost: form.approximate_cost,
            description: form.description,
            trip_image_url: form.trip_image_url
        }

        fetch('/trips_index', {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(tripInfo)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((trip) => {
                    console.log(trip)
                    history.push(`/tripreviews/${trip.id}`)
                })
            }
            else {
                r.json().then((error) => alert(error.message))
            }
        })
        setForm({
            destination: '',
            approximate_cost:'',
            description:'',
            trip_image_url:'',
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h4>Destination:</h4>
            <input
                type="text"
                placeholder="Destination..."
                name="destination"
                id="destination"
                autoComplete="off"
                value={form.destination}
                onChange={handleChange}
            />
            <h4>Approximate Cost:</h4>
            <input
                type="text"
                placeholder="Approximate Cost..."
                name="approximate_cost"
                id="approximate_cost"
                autoComplete="off"
                value={form.approximate_cost}
                onChange={handleChange}
            />
            <h4>Description:</h4>
            <input
                type="text"
                placeholder="Description..."
                name="description"
                id="description"
                autoComplete="off"
                value={form.description}
                onChange={handleChange}
            />
            <h4>Image:</h4>
            <input
                type="text"
                placeholder="Image URL..."
                name="trip_image_url"
                id="trip_image_url"
                autoComplete="off"
                value={form.trip_image_url}
                onChange={handleChange}
            />
            <button type="submit">Add trip</button>
        </form>
    )
}

export default NewTrip;